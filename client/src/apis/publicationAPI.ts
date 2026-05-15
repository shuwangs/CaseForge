import type { ApiResponse } from "../types/ApiResponse.ts";
import fetchWithAuth from "./fetchWithAuth.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export interface Publication {
	title: string | null;
	authors: string | null;
	publicationType: string | null;
	publicationDate: string | null;
	publicationYear?: number | null;
	doi: string | null;
	openalexId: string | null;
	pmid: string | null;
	journalName?: string | null;
	journalIssns?: string[];
	journalOpenalexId?: string | null;
	publisherName?: string | null;
	publisherCrossrefId?: string | null;
	rawData?: unknown;
}

export const fetchPublications = async (
	orcidId: string,
	token: string,
	projectId: number | string,
): Promise<Publication[]> => {
	const result = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}/publications/import`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				orcid: orcidId,
			}),
		},
	);

	if (!result.ok) {
		throw new Error("Fetch publications failed");
	}
	const data: ApiResponse<Publication[]> = await result.json();

	return data.data ?? [];
};

export const postPublications = async (
	projectId: number,
	payload: Publication[],
	token: string,
) => {
	const result = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}/publications`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				publications: payload,
			}),
		},
	);

	if (!result.ok) {
		throw new Error("Post publications failed");
	}
	const data: ApiResponse<Publication[]> = await result.json();

	return data.data;
};
