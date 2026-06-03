import { beforeEach, describe, expect, it, vi } from "vitest";

import fetchWithAuth from "../fetchWithAuth.ts";
import {
	fetchProjectSummary,
	generateJournalTableSummary,
	generateMapSummary,
	generateTrendSummary,
} from "../summaryApi.ts";

vi.mock("../fetchWithAuth.ts");

describe("summaryApi", () => {
	const mockToken = "mock-token";
	const projectId = 1;
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("generateJournalTableSummary should post request and return data on success ", async () => {
		const mockData = { summary: "This is summary text" };

		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: mockData }),
		} as Response);

		const result = await generateJournalTableSummary(projectId, mockToken);

		expect(fetchWithAuth).toHaveBeenCalledWith(
			mockToken,
			expect.stringContaining("/api/projects/1/ai/journal-impact-summary"),
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		expect(result).toEqual(mockData);
	});

	it("generateJournalTableSummary should throw error when backend message is missing", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
			json: async () => ({}),
		} as Response);

		await expect(
			generateJournalTableSummary(projectId, mockToken),
		).rejects.toThrow("Failed to generate journal table summary");
	});

	it("generateMapSummary should post request and return data on success ", async () => {
		const mockData = { summary: "This is summary text" };

		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: mockData }),
		} as Response);

		const result = await generateMapSummary(projectId, mockToken);

		expect(fetchWithAuth).toHaveBeenCalledWith(
			mockToken,
			expect.stringContaining("/api/projects/1/ai/map-summary"),
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		expect(result).toEqual(mockData);
	});

	it("generateMapSummary should throw error when backend message is missing", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
			json: async () => ({}),
		} as Response);

		await expect(generateMapSummary(projectId, mockToken)).rejects.toThrow(
			"Failed to generate map summary",
		);
	});

	// generateTrendSummary test
	it("generateTrendSummary should post request and return data on success ", async () => {
		const mockData = { summary: "This is summary text" };

		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: mockData }),
		} as Response);

		const result = await generateTrendSummary(projectId, mockToken);

		expect(fetchWithAuth).toHaveBeenCalledWith(
			mockToken,
			expect.stringContaining("/api/projects/1/ai/trend-summary"),
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		expect(result).toEqual(mockData);
	});

	it("generateTrendSummary should throw error when backend message is missing", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
			json: async () => ({}),
		} as Response);

		await expect(generateTrendSummary(projectId, mockToken)).rejects.toThrow(
			"Failed to generate trend summary",
		);
	});

	// fetchProjectSummary  test
	it("fetchProjectSummary should post request and return data on success ", async () => {
		const mockData = { summary: "This is summary text" };

		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ data: mockData }),
		} as Response);

		const result = await fetchProjectSummary(projectId, mockToken);

		expect(fetchWithAuth).toHaveBeenCalledWith(
			mockToken,
			expect.stringContaining("/api/projects/1/ai/summary"),
		);

		expect(result).toEqual(mockData);
	});

	it("fetchProjectSummary should throw error when backend message is missing", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
			json: async () => ({}),
		} as Response);

		await expect(fetchProjectSummary(projectId, mockToken)).rejects.toThrow(
			"Failed to fetch AI summary",
		);
	});
});
