const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Enqueue the jobs
export const getCitations = async (projectId: number, token: string) => {
	const result = await fetch(
		`${API_BASE_URL}/api/projects/${projectId}/citations/jobs`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (!result.ok) {
		throw new Error("Update Project failed");
	}

	const out = await result.json();
	alert(`${out.jobsQueued} citation jobs queued!`);
};

export const fetchCitationStatus = async (ProjectId: number, token: string) => {
	const result = await fetch(`${API_BASE_URL}/api/projects/${ProjectId}/citations/status`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}
	)

	if (!result.ok) {
		throw new Error("Failed to fetch citation status");
	}

	return result.json();

}

export const fetchCitationCount = async (ProjectId: number, token: string) => {
	const result = await fetch(`${API_BASE_URL}/api/projects/${ProjectId}/citation-counts`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}
	)
	if (!result.ok) {
		throw new Error("Failed to fetch citation counts");
	}

	const data = await result.json();
	return data.data;
}

export const fetchCitationYearlyCounts = async (ProjectId: number, token: string) => {
	const result = await fetch(`${API_BASE_URL}/api/projects/${ProjectId}/yearly-counts`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}
	)

	if (!result.ok) {
		throw new Error("Failed to fetch citation yearly counts");
	}
	const data = await result.json();
	return data.data;
}
export const fetchCitationMapData = async (ProjectId: number, token: string) => {
	const result = await fetch(`${API_BASE_URL}/api/projects/${ProjectId}/map`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}
	)

	if (!result.ok) {
		throw new Error("Failed to fetch citation map");
	}

	const data = await result.json();
	return data.data;
}
