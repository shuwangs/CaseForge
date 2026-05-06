import pool from "../db/db.js";

export const getProjectsByUserId = async (userId) => {
	const { rows } = await pool.query(
		`
            SELECT *
            FROM caseforge.projects
            WHERE user_id = $1
            ORDER BY created_at DESC
        `,
		[userId],
	);

	return rows;
};

export const getProjectsByClerkId = async (clerkId) => {
	const query = `
		SELECT p.*
		FROM caseforge.projects p
		JOIN caseforge.users u
			ON p.user_id = u.id
		WHERE u.clerk_id = $1
		ORDER BY p.created_at DESC;
	`;

	const { rows } = await pool.query(query, [clerkId]);
	return rows;
};

export const addProject = async (project) => {
	console.log("adding project in the sevice...", project);
	const {
		userId,
		projectName,
		firstName,
		lastName,
		institution,
		researchArea,
		careerStage,
		orcid,
		target,
	} = project;

	// Retrieve Insitution Id if exits if not add new institution

	let institutionId = null;
	if (institution.trim()) {
		console.log("the institution name is after trim:", institution);

		const institutionResult = await pool.query(
			`
            INSERT INTO caseforge.institutions (institution_name)
            VALUES(LOWER($1))
            ON CONFLICT(institution_name)
			DO UPDATE SET institution_name = EXCLUDED.institution_name
            RETURNING id;
        `,
			[institution],
		);
		institutionId = institutionResult.rows[0].id;
	}

	console.log("the institution id is :", institutionId);
	// add to DB
	const projectRes = await pool.query(
		`INSERT INTO caseforge.projects (user_id, project_name, institution_id , first_name, last_name, research_area , orcid , career_stage ,target)
        VALUES($1, $2, $3,$4, $5, $6,$7, $8, $9 )
        RETURNING *
        `,
		[
			userId,
			projectName,
			institutionId,
			firstName,
			lastName,
			researchArea,
			orcid,
			careerStage,
			target,
		],
	);
	return projectRes.rows[0];
};

export const deleteProjectById = async (projectId) => {
	const results = await pool.query(
		` 
		DELETE FROM caseforge.projects
		WHERE id = $1
		RETURNING *
		`,
		[projectId],
	);
	console.log("in project Sevice, deleteProject...", results.rows);
	return results.rows[0];
};

export const updateProjectById = async (projectId, payload) => {
	const {
		projectName,
		firstName,
		lastName,
		institution,
		researchArea,
		careerStage,
		orcid,
		target,
	} = payload;

	let institutionId = null;
	if (institution !== undefined) {
		if (institution.trim()) {
			const institutionResult = await pool.query(
				`
				INSERT INTO caseforge.institutions (institution_name)
				VALUES (LOWER($1))
				ON CONFLICT (institution_name)
				DO UPDATE SET institution_name = EXCLUDED.institution_name
				RETURNING id
				`,
				[payload.institution],
			);

			institutionId = institutionResult.rows[0].id;
		}
	}
	console.log("the institution id is updating :", institutionId);
	// add to DB
	const projectRes = await pool.query(
		`UPDATE caseforge.projects 
			SET 
				project_name = $1, 
				institution_id = $2,
				first_name = $3,
				last_name = $4,
				research_area = $5,
				orcid = $6,
				career_stage  = $7,
				target = $8
			WHERE id = $9
			RETURNING *
        	`,
		[
			projectName,
			institutionId,
			firstName,
			lastName,
			researchArea,
			orcid,
			careerStage,
			target,
			projectId,
		],
	);
	console.log("in service updated is: ", projectRes.rows);
	return projectRes.rows;
};
