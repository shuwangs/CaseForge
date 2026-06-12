import pool from "../db/db.js";
import AppError from "../errors/AppError.js";

export const getSummaryByProjectId = async (
	projectId: number,
	clerkId: string,
) => {
	const query = `
		SELECT s.*
		FROM caseforge.summaries s
		JOIN caseforge.projects p
			ON s.project_id = p.id
		JOIN caseforge.users u
			ON p.user_id = u.id
		WHERE s.project_id = $1
			AND u.clerk_id = $2
	    `;

	const { rows } = await pool.query(query, [projectId, clerkId]);

	return rows[0] || null;
};

export const saveTrendSummary = async (
	projectId: number,
	clerkId: string,
	summary: string,
) => {
	const query = `
		INSERT INTO caseforge.summaries (project_id, ai_trend)
		SELECT p.id, $3
		FROM caseforge.projects p
		JOIN caseforge.users u
			ON p.user_id = u.id
		WHERE p.id = $1
			AND u.clerk_id = $2
		ON CONFLICT (project_id)
		DO UPDATE SET ai_trend = EXCLUDED.ai_trend
		RETURNING *
	`;

	const { rows } = await pool.query(query, [projectId, clerkId, summary]);

	if (!rows.length) {
		throw new AppError("Project not found", 404);
	}

	return rows[0];
};

export const saveGeographicSummary = async (
	projectId: number,
	clerkId: string,
	summary: string,
) => {
	const query = `
		INSERT INTO caseforge.summaries (project_id, ai_geographic)
		SELECT p.id, $3
		FROM caseforge.projects p
		JOIN caseforge.users u
			ON p.user_id = u.id
		WHERE p.id = $1
			AND u.clerk_id = $2
		ON CONFLICT (project_id)
		DO UPDATE SET ai_geographic = EXCLUDED.ai_geographic
		RETURNING *
	`;

	const { rows } = await pool.query(query, [projectId, clerkId, summary]);

	if (!rows.length) {
		throw new AppError("Project not found", 404);
	}

	return rows[0];
};

export const saveOverviewJournal = async (
	projectId: number,
	clerkId: string,
	summary: string,
) => {
	const query = `
		INSERT INTO caseforge.summaries (project_id, ai_overview)
		SELECT p.id, $3
		FROM caseforge.projects p
		JOIN caseforge.users u
			ON p.user_id = u.id
		WHERE p.id = $1
			AND u.clerk_id = $2
		ON CONFLICT (project_id)
		DO UPDATE SET ai_overview = EXCLUDED.ai_overview
		RETURNING *
	`;

	const { rows } = await pool.query(query, [projectId, clerkId, summary]);

	if (!rows.length) {
		throw new AppError("Project not found", 404);
	}

	return rows[0];
};
