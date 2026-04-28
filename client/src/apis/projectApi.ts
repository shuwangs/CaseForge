import type { ApiResponse } from "../types/ApiResponse.ts";

export interface Project {
	userId: number | null;
	projectName: string | null;
	institutionId: number | null;
	firstName: string | null;
	LastName: string | null;
	researchArea: string | null;
	ocid: string | null;
	careerStage: string | null;
	target: string | null;
	createAt: string | null;
}
const mapProject = (data: any): Project => ({
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
	const result = await fetch(`/api/projects/user/${userId}`);
	if (!result.ok) {
		throw new Error("Fetch projects failed");
	}
	const data: ApiResponse<Project[]> = await result.json();

	return (data.data ?? []).map(mapProject);
};
