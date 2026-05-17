import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCitationCount, fetchCitationMapData } from "./citationApi.ts";

beforeEach(() => {
	vi.clearAllMocks();
	global.fetch = vi.fn();
});

describe("citationApi", () => {
	it("fetchCitationMapData returns citation counts by country", async () => {
		vi.mocked(fetch).mockResolvedValue({
			ok: true,
			json: async () => ({
				data: [
					{
						country: "US",
						value: 5,
					},
				],
			}),
		} as Response);

		const result = await fetchCitationMapData(1, "fake-token");

		expect(fetch).toHaveBeenCalled();
		expect(result).toEqual([
			{
				country: "US",
				value: 5,
			},
		]);
	});

	it("fetchCitationCount test citation count data per Paper", async () => {
		vi.mocked(fetch).mockResolvedValue({
			ok: true,
			json: async () => ({
				data: [
					{
						id: 1,
						title: "Paper 1",
						citation_count: "5",
					},
				],
			}),
		} as Response);

		const result = await fetchCitationCount(1, "fake-token");

		expect(result).toEqual([
			{
				id: 1,
				title: "Paper 1",
				citation_count: "5",
			},
		]);
	});
});
