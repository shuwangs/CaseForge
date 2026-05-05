import pool from "../db/db.js";

export const getUserByClerkId = async (clerkId) => {
	const result = await pool.query(
		`
		SELECT *
		FROM caseforge.users
		WHERE clerk_id = $1
		`,
		[clerkId],
	);
	return result.rows[0] ?? null;
};
