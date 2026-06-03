import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	fetchCitationCount,
	fetchCitationMapData,
	fetchCitationStatus,
	fetchCitationYearlyCounts,
	fetchJournalPublicationData,
	getCitations,
} from "../citationApi.ts";
import fetchWithAuth from "../fetchWithAuth.ts";

vi.mock("../fetchWithAuth.ts");

describe("citationApi", () => {
	const mockToken = "mock-token";
	const projectId = 1;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	//fetchCitationMapData test
	it("fetchCitationMapData returns citation counts by country", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
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

		expect(fetchWithAuth).toHaveBeenCalledWith(
			"fake-token",
			expect.stringContaining("/api/projects/1/map"),
		);
		expect(result).toEqual([
			{
				country: "US",
				value: 5,
			},
		]);
	});

	it("fetchCitationMapData throw error when response is not okay", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(fetchCitationMapData(projectId, mockToken)).rejects.toThrow(
			"Failed to fetch citation map",
		);
		;
	});

	// fetchCitationCount test
	it("fetchCitationCount test citation count data per Paper", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
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

		expect(fetchWithAuth).toHaveBeenCalledWith(
			"fake-token",
			expect.stringContaining("/api/projects/1/citation-counts"),
		);
		expect(result).toEqual([
			{
				id: 1,
				title: "Paper 1",
				citation_count: "5",
			},
		]);
	});

	it("fetchCitationCount throw error when response is not okay", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(fetchCitationCount(projectId, mockToken)).rejects.toThrow(
			"Failed to fetch citation counts",
		);

	});


	// fetchCitationYearlyCounts test
	it("fetchCitationYearlyCounts test citation count data per Paper", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({
				data: [
					{
						year: 2025,
						citation_count: "5",
					},
				],
			}),
		} as Response);

		const result = await fetchCitationYearlyCounts(1, "fake-token");

		expect(fetchWithAuth).toHaveBeenCalledWith(
			"fake-token",
			expect.stringContaining("/api/projects/1/yearly-counts"),
		);
		expect(result).toEqual([
			{
				year: 2025,
				citation_count: "5",
			},
		]);
	});

	it("fetchCitationYearlyCounts throw error when response is not okay", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(fetchCitationYearlyCounts(projectId, mockToken)).rejects.toThrow(
			"Failed to fetch citation yearly counts",
		);

	});


	// fetchJournalPublicationData

	it("fetchJournalPublicationData test citation count data per Paper", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({
				data: [
					{
						journal: "Journal 1",
						citation_count: "5",
					},
				],
			}),
		} as Response);

		const result = await fetchJournalPublicationData(1, "fake-token");

		expect(fetchWithAuth).toHaveBeenCalledWith(
			"fake-token",
			expect.stringContaining("/api/projects/1/journals"),
		);
		expect(result).toEqual([
			{
				journal: "Journal 1",
				citation_count: "5",
			},
		]);
	});

	it("fetchJournalPublicationData throw error when response is not okay", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(fetchJournalPublicationData(projectId, mockToken)).rejects.toThrow(
			"Failed to fetch journal publication data",
		);

	});


	//getCitations test
	it("getCitations should enqueue citation jobs and return queued job count", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => ({ jobsQueued: 3 }),
		} as Response);

		const result = await getCitations(projectId, mockToken);

		expect(fetchWithAuth).toHaveBeenCalledWith(
			mockToken,
			expect.stringContaining("/api/projects/1/citations/jobs"),
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				cache: "no-store",
			},
		);

		expect(result).toEqual({ jobsQueued: 3 });

	})

	it("getCitations should throw when response is not ok", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(getCitations(projectId, mockToken)).rejects.toThrow(
			"Update Project failed",
		);
	});

	// fetchCitationStatus

	it("fetchCitationStatus return citation status reponse", async () => {
		const mockStatus = {
			data: {
				active: 1,
				wait: 0,
				failed: 0,
				completed: 2,
			},
		};

		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: true,
			json: async () => mockStatus,
		} as Response);

		const result = await fetchCitationStatus(projectId, mockToken);

		expect(fetchWithAuth).toHaveBeenCalledWith(
			mockToken,
			expect.stringContaining("/api/projects/1/citations/status"),
		);

		expect(result).toEqual(mockStatus);
	})

	it("fetchCitationStatus should throw when response is not ok", async () => {
		vi.mocked(fetchWithAuth).mockResolvedValue({
			ok: false,
		} as Response);

		await expect(fetchCitationStatus(projectId, mockToken)).rejects.toThrow(
			"Failed to fetch citation status",
		);
	});

});
