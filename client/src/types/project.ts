// Frontend data format
export interface Project {
	userId: number | null;
	projectName: string | null;
	institutionId: number | null;
	firstName: string | null;
	LastName: string | null;
	researchArea: string | null;
	orcid: string | null;
	careerStage: string | null;
	target: string | null;
	createAt: string | null;
}

// Backend data formate
export interface ProjectDTO {
	id: number | null;
	user_id: number | null;
	project_name: string | null;
	institution_id: number | null;
	first_name: string | null;
	last_name: string | null;
	research_area: string | null;
	orcid: string | null;
	career_stage: string | null;
	target: string | null;
	created_at: string | null;
}
