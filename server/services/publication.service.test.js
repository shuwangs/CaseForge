import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	saveProjectPublication,
	searchPublicationsByOrcid,
} from "./publication.service.js";

vi.mock("../../db/db.js", () => ({
	default: {
		query: vi.fn(),
	},
}));

beforeEach(() => {
	vi.clearAllMocks();
	global.fetch = vi.fn();
});

describe("publication service", () => {
	it("searchPublicationsByOrcid returns normlized publications", async () => {
		global.fetch.mockResolvedValue({
			ok: true,
			json: async () => [
				{
					id: "https://openalex.org/W123",
					title: "Test Publication",
				},
			],
		});

		const result = await searchPublicationsByOrcid("0000-0001-0001-0001");
		expect(global.fetch).toHaveBeenCalled();

		expect(result[0]).toMatchObject({
			title: "Test Publication",
		});
	});

	it("searchPublicationsByOrcid throw errors when failed", async () => {
		global.fetch.mockResolvedValue({
			ok: false,
		});

		await expect(
			searchPublicationsByOrcid("0000-0001-0001-0001"),
		).rejects.toThrow("Failed to fetch publication data");
	});

	it("saveProjectPublication throws when publications are empty", async () => {
		await expect(saveProjectPublication(1, [])).rejects.toThrow(
			"No publications provided",
		);
	});
});
