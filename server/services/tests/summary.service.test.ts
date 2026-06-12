import { beforeEach, describe, expect, it, vi } from "vitest";
import pool from "../../db/db.js";
import {
	getSummaryByProjectId,
	saveGeographicSummary,
	saveOverviewJournal,
	saveTrendSummary,
} from "../summary.service.js";

vi.mock("../../db/db.js", () => ({
	default: {
		query: vi.fn(),
	},
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("summary.service", () => {
	it("getSummaryByProjectId return summary if exists", async () => {
		pool.query.mockResolvedValue({
			rows: [{ id: 1, project_id: 1, ai_trend: "mock_trend_summary." }],
		});

		const result = await getSummaryByProjectId(1, "clerk_123");

		expect(pool.query).toHaveBeenCalled();
		expect(result).toEqual({
			id: 1,
			project_id: 1,
			ai_trend: "mock_trend_summary.",
		});
	});

	it("getSummaryByProjectId return null if it doesnot exist", async () => {
		pool.query.mockResolvedValue({
			rows: [],
		});

		const result = await getSummaryByProjectId(1, "clerk_123");

		expect(pool.query).toHaveBeenCalled();
		expect(result).toBeNull();
	});

	it("saveTrendSummary return saved summary", async () => {
		pool.query.mockResolvedValue({
			rows: [{ id: 1, project_id: 1, ai_trend: "mock_trend_summary." }],
		});

		const result = await saveTrendSummary(
			1,
			"clerk_123",
			"mock_trend_summary.",
		);
		expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
			1,
			"clerk_123",
			"mock_trend_summary.",
		]);
		expect(result).toEqual({
			id: 1,
			project_id: 1,
			ai_trend: "mock_trend_summary.",
		});
	});

	it("saveGeographicSummary return saved summary", async () => {
		pool.query.mockResolvedValue({
			rows: [{ id: 1, project_id: 1, ai_trend: "mock_trend_summary." }],
		});

		const result = await saveGeographicSummary(
			1,
			"clerk_123",
			"mock_trend_summary.",
		);
		expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
			1,
			"clerk_123",
			"mock_trend_summary.",
		]);
		expect(result).toEqual({
			id: 1,
			project_id: 1,
			ai_trend: "mock_trend_summary.",
		});
	});

	it("saveOverviewJournal return saved summary", async () => {
		pool.query.mockResolvedValue({
			rows: [{ id: 1, project_id: 1, ai_trend: "mock_trend_summary." }],
		});
		const result = await saveOverviewJournal(
			1,
			"clerk_123",
			"mock_trend_summary.",
		);

		expect(pool.query).toHaveBeenCalled();
		expect(result).toEqual({
			id: 1,
			project_id: 1,
			ai_trend: "mock_trend_summary.",
		});
	});
});
