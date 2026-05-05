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
