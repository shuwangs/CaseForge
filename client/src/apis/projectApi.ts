import type { ApiResponse } from "../types/ApiResponse.ts";
import type { NewProjectPayload, Project, ProjectDTO } from "../types/project.ts";

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



export const fetchAllProjects = async (userId: number): Promise<Project[]> => {
	const result = await fetch(`${API_BASE_URL}/api/projects/user/${userId}`);
	if (!result.ok) {
		throw new Error("Fetch projects failed");
	}
	const data: ApiResponse<Project[]> = await result.json();

	return (data.data ?? []).map(mapProject);
};


export const addNewProject = async (payload: NewProjectPayload): Promise<Project> => {
	const result = await fetch(`${API_BASE_URL}/api/projects`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!result.ok) {
		throw new Error("Add new project failed");
	}

	const data: ApiResponse<ProjectDTO> = await result.json();
	if (!data.data) {
		throw new Error("No project returned from server");
	}
	return mapProject(data.data);
}