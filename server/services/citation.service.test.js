import { beforeEach, describe, expect, it, vi } from "vitest";
import pool from "../db/db.js";
import {
	fetchCitation,
	getCitationCountsByYear,
	getCitationMapData,
	getCitationsCountByProjectId,
} from "./citation.service.js";

vi.mock("../db/db.js", {
	default: {
		query: vi.fn(),
	},
});

beforeEach(() => {
	vi.clearAllMocks();
});

describe("citation service test", () => {
	it("fetchCitation returns citation results", async () => {
		global.fetch = vi.fn();

		global.fetch.mockResolvedValue({
			ok: true,
			json: async () => ({
				results: [
					{
						id: "W123456",
						title: "Citation paper",
					},
				],
			}),
		});

		const result = await fetchCitation("W123456");

		expect(global.fetch).toHaveBeenCalled();

		expect(result).toEqual([
			{
				id: "W123456",
				title: "Citation paper",
			},
		]);
	});

	it("fetchCitation failed", async () => {
		global.fetch = vi.fn();

		global.fetch.mockResolvedValue({
			ok: false,
		});

		await expect(fetchCitation("W12324")).rejects.toThrow(
			"Failed to fetch citations",
		);
	});

	it("getCitationMapData returns map data", async () => {
		pool.query.mockResolvedValue({
			rows: [
				{
					country: "US",
					citation_count: 5,
				},
			],
		});
		const result = await getCitationMapData(1, "clerk_123");

		expect(pool.query).toHaveBeenCalled();

		expect(result).toEqual([
			{
				country: "US",
				value: 5,
			},
		]);
	});

	it("getCitationCountsByYear returns citation counts per year", async () => {
		pool.query.mockResolvedValue({
			rows: [
				{
					citing_year: 2024,
					citation_count: "10",
				},
			],
		});

		const result = await getCitationCountsByYear(1, "clerk_123");

		expect(pool.query).toHaveBeenCalled();
		expect(result).toEqual([
			{
				citing_year: 2024,
				citation_count: "10",
			},
		]);
	});

	it("getCitationsCountByProjectId returns citation counts per year", async () => {
		pool.query.mockResolvedValue({
			rows: [
				{
					id: 1,
					title: "Paper 1",
					citation_count: "12",
				},
			],
		});

		const result = await getCitationsCountByProjectId(1, "clerk_123");

		expect(pool.query).toHaveBeenCalled();
		expect(result).toEqual([
			{
				id: 1,
				title: "Paper 1",
				citation_count: "12",
			},
		]);
	});
});
