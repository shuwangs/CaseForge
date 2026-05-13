import dotenv from "dotenv";
import pool from "../db/db.js";
import AppError from "../errors/AppError.js";
import { normalizePublications } from "../utitls/publication.helper.js";

dotenv.config();

const api = process.env.PUBLICATION_API;

// Search publication from by Orcid call third party API
export const searchPublicationsByOrcid = async (orcid) => {
	const res = await fetch(`${api}${orcid}`);
	if (!res.ok) {
		throw new AppError("Failed to fetch publication data", 502);
	}

	const data = await res.json();
	const normalizedData = normalizePublications(data);

	return normalizedData;
};

export const insertPublication = async (projectId, publication) => {
	const query = `
    INSERT INTO caseforge.publications (
        project_id,
        title,
        authors,
        publication_type,
        publication_date,

        doi,
        openalex_id,
        pmid,

        journal_name,
        journal_issns,
        journal_openalex,

        publisher_name,
        publisher_crossrefId,
        raw_data
    )
    VALUES(
        $1, $2, $3, $4, $5, $6, $7, $8,  $9, $10, $11, $12, $13, $14)
     
    RETURNING *;
    `;

	const values = [
		projectId,
		publication.title,
		publication.authors,
		publication.publicationType,
		publication.publicationDate,

		publication.doi,
		publication.openalexId,
		publication.pmid,

		publication.journalName,
		publication.journalIssns ? JSON.stringify(publication.journalIssns) : null,
		publication.journalOpenalexId,

		publication.publisherName,
		publication.publisherCrossrefId,
		publication.rawData,
	];

	const { rows } = await pool.query(query, values);
	console.log("in service insertPublication: ", rows);
	return rows[0];
};

export const saveProjectPublication = async (projectId, publications) => {
	if (!publications || publications.length === 0) {
		throw new AppError("No publications provided", 400);
	}
	const savedPublications = [];

	for (const publication of publications) {
		const saved = await insertPublication(projectId, publication);
		savedPublications.push(saved);
	}
	return savedPublications;
};

export const getPublicationsByProjectId = async (clerkId, projectId) => {
	const query = `
        SELECT pub.*
        FROM caseforge.publications pub
        JOIN caseforge.projects pr
          ON pub.project_id = pr.id
        JOIN caseforge.users u
          ON pr.user_id = u.id
        WHERE pr.id = $1
          AND u.clerk_id = $2
    `;

	const { rows } = await pool.query(query, [projectId, clerkId]);
	return rows;
};

export const importPublicationsByOrcid = async (clerkId, projectId, orcid) => {
	const projectQuery = `
		SELECT pr.id
		FROM caseforge.projects pr
		JOIN caseforge.users u ON pr.user_id = u.id
		WHERE pr.id = $1
		  AND u.clerk_id = $2
	`;

	const { rows } = await pool.query(projectQuery, [projectId, clerkId]);

	if (rows.length === 0) {
		throw new AppError("Project not found or unauthorized", 404);
	}

	const publications = await searchPublicationsByOrcid(orcid);

	if (!publications || publications.length === 0) {
		throw new AppError("No publications found", 404);
	}
	const savedPublications = await saveProjectPublication(
		projectId,
		publications,
	);

	return savedPublications;
};
