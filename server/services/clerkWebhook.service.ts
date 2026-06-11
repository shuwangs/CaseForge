import pool from "../db/db.ts";

export const upsertUserFromClerk = async (clerk_id: string, email: string) => {
	const { rows } = await pool.query(
		`INSERT INTO caseforge.users(clerk_id, email)
        VALUES($1, $2)
        ON CONFLICT(clerk_id)
        DO UPDATE SET clerk_id = EXCLUDED.clerk_id
        RETURNING id
        `,
		[clerk_id, email],
	);
	return rows[0].id;
};

export const deleteUserByClerkId = async (clerk_id: string) => {
	await pool.query(
		`
    DELETE FROM caseforge.users
    WHERE clerk_id = $1;
    `,
		[clerk_id],
	);
};
