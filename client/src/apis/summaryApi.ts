import fetchWithAuth from "./fetchWithAuth.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const generateJournalTableSummary = async (
	projectId: number | string,
	token: string,
) => {
	const response = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}/ai/journal-impact-summary`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error(
			result.message || "Failed to generate journal table summary",
		);
	}
	return result.data;
};

export const generateTrendSummary = async (
	projectId: number | string,
	token: string,
) => {
	const response = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}/ai/trend-summary`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || "Failed to generate trend summary");
	}
	return result.data;
};

export const generateMapSummary = async (
	projectId: number | string,
	token: string,
) => {
	const response = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}/ai/map-summary`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || "Failed to generate map summary");
	}
	return result.data;
};

export const fetchProjectSummary = async (
	projectId: number | string,
	token: string,
) => {
	const response = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}/ai/summary`,
	);

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || "Failed to fetch AI summary");
	}

	return result.data;
};
