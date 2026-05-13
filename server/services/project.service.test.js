import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProjectsByClerkId } from "../../services/project.service.js";
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
});
