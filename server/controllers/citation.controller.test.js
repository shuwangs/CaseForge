import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import projectRoutes from "../../routes/project.publication.route.js";
import {
	getCitationCountsByYear,
	getCitationMapData,
	getCitationsCountByProjectId,
} from "../services/citation.service.js";

vi.mock("../queues/citation.queue.js", () => ({
	enqueueCitation: vi.fn(),
	citationsQueue: {
		getJobCounts: vi.fn(),
	},
}));

vi.mock("../services/citation.service.js", () => ({
	getCitationCountsByYear: vi.fn(),
	getCitationMapData: vi.fn(),
	getCitationsCountByProjectId: vi.fn(),
}));

vi.mock("../services/publication.service.js", () => ({
	getPublicationsByProjectId: vi.fn(),
}));

vi.mock("../utitls/idValidate.js", () => ({
	idValidate: vi.fn(),
}));

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
	req.clerkId = "clerk_123";
	next();
});

app.use("/api/projects", projectRoutes);

beforeEach(() => {
	vi.clearAllMocks();
});

describe("citation controller test", () => {
	it("GET /api/projects/:projectId/citation-counts returns citation counts per paper", async () => {
		getCitationsCountByProjectId.mockResolvedValue([
			{
				id: 1,
				title: "Paper 1",
				citation_count: "5",
			},
		]);

		const res = await request(app).get("/api/projects/1/citation-counts");

		expect(res.status).toBe(200);

		expect(getCitationsCountByProjectId).toHaveBeenCalledWith("1", "clerk_123");
		expect(res.body).toEqual({
			success: true,
			data: [
				{
					id: 1,
					title: "Paper 1",
					citation_count: "5",
				},
			],
		});
	});

	it("GET /api/projects/:projectId/yearly-counts returns citation counts per year", async () => {
		getCitationCountsByYear.mockResolvedValue([
			{
				citing_year: 2025,
				citation_count: "5",
			},
		]);

		const res = await request(app).get("/api/projects/1/yearly-counts");

		expect(res.status).toBe(200);

		expect(getCitationCountsByYear).toHaveBeenCalledWith("1", "clerk_123");
		expect(res.body).toEqual({
			success: true,
			data: [
				{
					citing_year: 2025,
					citation_count: "5",
				},
			],
		});
	});

	it("GET /api/projects/:projectId/map returns citation counts per country code", async () => {
		getCitationMapData.mockResolvedValue([
			{
				country: "US",
				citation_count: "5",
			},
		]);

		const res = await request(app).get("/api/projects/1/map");

		expect(res.status).toBe(200);

		expect(getCitationMapData).toHaveBeenCalledWith("1", "clerk_123");
		expect(res.body).toEqual({
			success: true,
			data: [
				{
					country: "US",
					citation_count: "5",
				},
			],
		});
	});
});
