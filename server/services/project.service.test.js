import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	addProject,
	deleteProjectById,
	getProjectsByClerkId,
	updateProjectById,
} from "../../services/project.service.js";
import pool from "../db/db.js";

vi.mock("../db/db.js", () => ({
	default: {
		query: vi.fn(),
	},
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("Project.service. testing", () => {
	it("getProjectsByClerkId return rows", async () => {
		pool.query.mockResolvedValue({
			rows: [
				{
					id: 1,
					project_name: "CaseForge Test",
				},
			],
		});
		const result = await getProjectsByClerkId("clerk_123");

		expect(pool.query).toHaveBeenCalledWith(expect.any(String), ["clerk_123"]);

		expect(result).toEqual([
			{
				id: 1,
				project_name: "CaseForge Test",
			},
		]);
	});

	it("addProject to insert institutions and Project", async () => {
		pool.query
			.mockResolvedValueOnce({
				rows: [{ id: 12 }],
			})
			.mockResolvedValueOnce({
				rows: [
					{
						id: 1,
						project_name: "CaseForge Test",
						institution_id: 12,
					},
				],
			});

		const _result = await addProject({
			userId: 1,
			projectName: "CaseForge Test",
			firstName: "Shu",
			lastName: "Wang",
			institution: "Georgia Tech",
			researchArea: "Bioinformatics",
			careerStage: "PhD",
			orcid: "0000-0001",
			target: "EB1A",
		});

		expect(pool.query).toHaveBeenCalledTimes(2);
	});

	it("deleteProjectById return deleted project", async () => {
		pool.query.mockResolvedValue({
			rows: [
				{
					id: 1,
					project_name: "Deleted Project",
				},
			],
		});

		const result = await deleteProjectById(1, "clerk_123");

		expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
			1,
			"clerk_123",
		]);

		expect(result).toMatchObject({
			id: 1,
			project_name: "Deleted Project",
		});
	});

	it("updateProjectById return updated project", async () => {
		pool.query
			.mockResolvedValueOnce({
				rows: [{ id: 12 }],
			})
			.mockResolvedValueOnce({
				rows: [
					{
						id: 1,
						project_name: "Updated Project",
						institution_id: 12,
					},
				],
			});

		const payload = {
			projectName: "CaseForge Test",
			firstName: "Shu",
			lastName: "Wang",
			institution: "Georgia Tech",
			researchArea: "Bioinformatics",
			careerStage: "PhD",
			orcid: "0000-0001",
			target: "EB1A",
		};

		const result = await updateProjectById(1, payload, "clerk_123");

		expect(pool.query).toHaveBeenCalledTimes(2);
		expect(result[0]).toMatchObject({
			id: 1,
			project_name: "Updated Project",
			institution_id: 12,
		});
	});
});
