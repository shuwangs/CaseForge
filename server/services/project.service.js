import pool from "../db/db.js";

export const getProjectsByUserId = async (userId) => {
    const result = await pool.query(
        `
            SELECT *
            FROM caseforge.projects
            WHERE user_id = $1
            ORDER BY created_at DESC
        `,
        [userId],
    );

    return result.rows;
};
