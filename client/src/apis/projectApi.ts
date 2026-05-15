import type { ApiResponse } from "../types/ApiResponse.ts";
import type {
	NewProjectPayload,
	Project,
	ProjectDTO,
} from "../types/project.ts";
import fetchWithAuth from "./fetchWithAuth.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const mapProject = (data: ProjectDTO): Project => ({
	id: data.id,
	userId: data.user_id,
	projectName: data.project_name,
	institutionId: data.institution_id,
	firstName: data.first_name,
	lastName: data.last_name,
	researchArea: data.research_area,
	orcid: data.orcid,
	careerStage: data.career_stage,
	target: data.target,
	createdAt: data.created_at,
});

export const fetchAllProjects = async (token: string): Promise<Project[]> => {
	const result = await fetchWithAuth(token, `${API_BASE_URL}/api/projects`);
	if (!result.ok) {
		throw new Error("Fetch projects failed");
	}
	const data: ApiResponse<Project[]> = await result.json();

	return (data.data ?? []).map(mapProject);
};

export const addNewProject = async (
	payload: NewProjectPayload,
	token: string,
): Promise<Project> => {
	const result = await fetchWithAuth(token, `${API_BASE_URL}/api/projects`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	if (!result.ok) {
		throw new Error("Add new project failed");
	}

	const data: ApiResponse<ProjectDTO> = await result.json();
	if (!data.data) {
		throw new Error("No project returned from server");
	}
	return mapProject(data.data);
};

export const deleteProject = async (projectId: number, token: string) => {
	const result = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}`,
		{
			method: "DELETE",
		},
	);

	if (!result.ok) {
		throw new Error("Delete Project failed");
	}
	const data = await result.json();
	return data.data;
};

export const updateProject = async (
	projectId: number,
	payload: NewProjectPayload,
	token: string,
) => {
	const result = await fetchWithAuth(
		token,
		`${API_BASE_URL}/api/projects/${projectId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		},
	);
	if (!result.ok) {
		throw new Error("Update Project failed");
	}
	const data = await result.json();
	return data.data;
};
