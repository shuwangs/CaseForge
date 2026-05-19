import dotenv from "dotenv";
import pool from "../db/db.js";
import AppError from "../errors/AppError.js";

dotenv.config();

export const fetchCitation = async (workId) => {
	try {
		const OPENALEX_URL =
			process.env.OPENALEX_URL ||
			"https://api.openalex.org/works?filter=cites:";

		const response = await fetch(`${OPENALEX_URL}${workId}`, {
			signal: AbortSignal.timeout(30000),
		});

		if (!response.ok) {
			throw new AppError(
				"Failed to fetch citations",
				response.status >= 500 ? 502 : response.status,
			);
		}

		const data = await response.json();
		const results = data.results;
		return results;
	} catch (err) {
		if (err.name === "TimeoutError" || err.name === "AbortError") {
			throw new AppError("Timeout: OpenAlex citation request timed out!", 504);
		} else {
			throw new AppError(err.message || "citation fetch failed", 500);
		}
	}
};

export const saveCitation = async (
	projectId,
	publicationOpenAlexId,
	normalizedCitation,
) => {
	// console.log("Save citation, projectId is : ", projectId);
	const client = await pool.connect();

	try {
		await client.query("BEGIN");
		const pubResult = await client.query(
			`
            SELECT id
            FROM caseforge.publications
            WHERE project_id = $1 
                AND openalex_id =$2
            `,
			[projectId, publicationOpenAlexId],
		);

		if (!pubResult.rows.length) {
			throw new AppError("Publication not found", 404);
		}
		const publicationId = pubResult.rows[0].id;
		// console.log("save Citation publciation Id is: ", publicationId);

		const { normalized, citation_institutions } = normalizedCitation;

		// insert into citation
		const insertCitationQuery = `
            INSERT INTO caseforge.citation_records (
            publication_id, citing_title, citing_authors, citing_journal, citing_year, citing_type, doi,
            openalex_id, pmid, raw_data)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (publication_id,openalex_id)
            DO UPDATE SET citing_title = EXCLUDED.citing_title
            RETURNING id
        `;

		const insertInstitutionQuery = `
            INSERT INTO caseforge.institutions (
            institution_name, country, institution_type)
            VALUES($1, $2, $3)
            ON CONFLICT (institution_name, country)
            DO UPDATE SET institution_name = EXCLUDED.institution_name
            RETURNING id
        `;
		const insertCiteRecInsQuery = `
            INSERT INTO caseforge.citation_record_institutions (
            citation_record_id, institution_id)
            VALUES($1, $2)
            ON CONFLICT (citation_record_id, institution_id)
            DO NOTHING
        `;

		const citationRes = await client.query(insertCitationQuery, [
			publicationId,
			normalized.citing_title,
			normalized.citing_authors,
			normalized.citing_journal,
			normalized.citing_year,
			normalized.citing_type,
			normalized.doi,
			normalized.openalex_id,
			normalized.pmid,
			normalized.raw_data,
		]);

		const citationId = citationRes.rows[0].id;
		console.log(
			"in citation service, save citation.., citationRes is: ",
			citationId,
		);

		// insert institutions and

		for (const ins of citation_institutions) {
			if (!ins.institution_name) continue;

			// insert institutions and GET the institution id;
			const insRes = await client.query(insertInstitutionQuery, [
				ins.institution_name,
				ins.country,
				ins.institution_type,
			]);
			const insId = insRes.rows[0].id;
			// console.log("Inserted institutions id is:", insId);

			// insert citation_record_institutions
			const _citeRecInsRes = await client.query(insertCiteRecInsQuery, [
				citationId,
				insId,
			]);
		}

		await client.query("COMMIT");
		return { ok: true };
	} catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		client.release();
	}
};

export const getCitationMapData = async (projectId, clerkId) => {
	const query = `
	SELECT i.country, COUNT(cr.id) as citation_count
	FROM caseforge.citation_records cr
	JOIN caseforge.publications pub
		ON cr.publication_id = pub.id
	JOIN caseforge.projects pr
		ON pub.project_id = pr.id

	JOIN caseforge.users u
		ON pr.user_id = u.id		

	JOIN caseforge.citation_record_institutions cri
		ON cr.id = cri.citation_record_id

	JOIN caseforge.institutions i
		ON cri.institution_id = i.id

	WHERE
		pub.project_id = $1
		AND u.clerk_id = $2
		AND i.country IS NOT NULL
	GROUP BY i.country
	ORDER BY citation_count DESC
	`;

	const { rows } = await pool.query(query, [projectId, clerkId]);

	return rows.map((row) => ({
		country: row.country,
		value: Number(row.citation_count),
	}));
};

export const getCitationCountsByYear = async (projectId, clerkId) => {
	const query = `
	SELECT cr.citing_year, COUNT(cr.id) as citation_count
	FROM caseforge.citation_records cr
	JOIN caseforge.publications pub 
		ON cr.publication_id = pub.id
	JOIN caseforge.projects pr 
		ON pub.project_id = pr.id
	JOIN caseforge.users u
		ON pr.user_id = u.id
	
	WHERE pub.project_id = $1
			AND u.clerk_id = $2

	GROUP BY cr.citing_year
	ORDER BY cr.citing_year
		`;
	const { rows } = await pool.query(query, [projectId, clerkId]);

	return rows;
};

export const getCitationsCountByProjectId = async (projectId, clerkId) => {
	const query = `
		SELECT pub.id, pub.title, pub.publication_date, pub.journal_name,
		COUNT(cr.id) as citation_count

		FROM caseforge.publications pub 

		JOIN caseforge.projects pr
			ON pub.project_id = pr.id
		JOIN caseforge.users u
			ON pr.user_id = u.id

		LEFT JOIN caseforge.citation_records  cr
			ON pub.id = cr.publication_id
		
		WHERE pub.project_id = $1
			AND u.clerk_id = $2
		GROUP BY  pub.id, pub.title, pub.publication_date, pub.journal_name
		ORDER BY citation_count DESC
		`;

	const { rows } = await pool.query(query, [projectId, clerkId]);
	return rows;
};
