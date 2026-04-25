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
interface ApiResponse<T> {
	success: boolean;
	data: T;
}

export const fetchPublications = async (orcidId: string): Promise<Publication[]> => {
	console.log("In apis, resqing orcid is:", orcidId);
	const result = await fetch(`api/publication/search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			orcid: orcidId,
		}),
	});

	if (!result.ok) {
		throw new Error("Fetch publications failed");
	}
	const data: ApiResponse<Publication[]> = await result.json();

	return data.data;
};

export const postPublications = async (projectId: number, payload: Publication[]) => {
	console.log("In apis,  posting publications to db:", payload);
	const result = await fetch(`api/projects/${projectId}/publications`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			publications: payload,
		}),
	});

	if (!result.ok) {
		throw new Error("Post publications failed");
	}
	const data: ApiResponse<Publication[]> = await result.json();

	return data.data;
};
