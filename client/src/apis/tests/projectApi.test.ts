import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchWithAuth from "../fetchWithAuth.ts";
import {
	addNewProject,
	deleteProject,
	fetchAllProjects,
	fetchProjectStatus,
	updateProject,
} from "../projectApi.ts";

vi.mock("../fetchWithAuth.ts");
describe("projectApi", () => {
	// Prepare the data
	const mockToken = "fake-jwt-token";
	const mockDbProject = {
		id: 1,
		user_id: "user-99",
		project_name: "My Research",
		institution_id: "homestay",
		first_name: "Bobo",
		last_name: "Wang",
		research_area: "Bioinformatics",
		orcid: "0000-0002-1825-0097",
		career_stage: "Graduate Student",
		target: "EB-1A",
		created_at: "2026-05-28T12:00:00.000Z",
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should fetch all projects on success", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: [mockDbProject] }),
		} as Response);

		const projects = await fetchAllProjects(mockToken);

		expect(projects).toHaveLength(1);
		expect(projects[0].projectName).toBe("My Research");
		expect(projects[0].userId).toBe("user-99");
	});

	it("fetchAllProjects should throw when response is not ok", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(fetchAllProjects(mockToken)).rejects.toThrow(
			"Fetch projects failed",
		);
	});

	it("deleteProject should send DELETE request and return response data", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: { success: true } }),
		} as Response);

		const res = await deleteProject(1, mockToken);
		expect(res.success).toBe(true);
	});

	it("deleteProject should throw when response is not ok", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(deleteProject(1, mockToken)).rejects.toThrow(
			"Delete Project failed",
		);
	});

	it("should fetch project workflow milestone status", async () => {
		const mockStatus = { hasPublications: true, hasCitations: false };
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: mockStatus }),
		} as Response);

		const status = await fetchProjectStatus(1, mockToken);
		expect(status.hasPublications).toBe(true);
		expect(status.hasCitations).toBe(false);
	});

	it("fetchProjectStatus should throw when response is not ok", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(fetchProjectStatus(1, mockToken)).rejects.toThrow(
			"Fetch projects failed",
		);
	});

	it("should post payload and return mapped project", async () => {
		const payload = { projectName: "ABC Project", first_name: "Bo" };
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: mockDbProject }),
		} as Response);

		const result = await addNewProject(payload, mockToken);

		expect(result.firstName).toBe("Bobo");
	});

	it("updateProject and return updated project", async () => {
		const payload = { projectName: "Updated Project" };
		const updatedProject = {
			...mockDbProject,
			project_name: "Updated Project",
		};

		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: updatedProject }),
		} as Response);

		const result = await updateProject(1, payload, mockToken);
		expect(result.project_name).toBe("Updated Project");
	});

	it("updateProject should throw when response is not ok", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(
			updateProject(1, { projectName: "Bad Update" }, mockToken),
		).rejects.toThrow("Update Project failed");
	});
});
