import type { ApiResponse } from "../types/ApiResponse.ts";
import type { Project, ProjectDTO } from "../types/project.ts";

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
