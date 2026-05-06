import type { ApiResponse } from "../types/ApiResponse.ts";
import type {
	NewProjectPayload,
	Project,
	ProjectDTO,
} from "../types/project.ts";

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
	const result = await fetch(`${API_BASE_URL}/api/projects`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!result.ok) {
		throw new Error("Fetch projects failed");
	}
	const data: ApiResponse<Project[]> = await result.json();

	return (data.data ?? []).map(mapProject);
};

export const addNewProject = async (
	payload: NewProjectPayload, token: string
): Promise<Project> => {
	console.log("in projectApi, the passed in payload is: ", payload);

	const result = await fetch(`${API_BASE_URL}/api/projects`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
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

export const deleteProject = async (projectId: number) => {
	console.log("in projectApi, the project to be deteletd is: ", projectId);
	const result = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
		method: "DELETE",
	});
	if (!result.ok) {
		throw new Error("Delete Project failed");
	}
	const data = await result.json();
	return data.data;
};

export const updateProject = async (
	projectId: number,
	payload: NewProjectPayload,
) => {
	console.log("calling updateProject API:", projectId, payload);
	const result = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!result.ok) {
		throw new Error("Update Project failed");
	}
	const data = await result.json();
	return data.data;
};
