import pool from "../db/db.ts";

export const getUserByClerkId = async (clerkId: string) => {
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
