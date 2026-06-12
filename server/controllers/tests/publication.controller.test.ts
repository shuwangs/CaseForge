import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectRoutes from "../../routes/project.publication.route.js";
import publicationRoutes from "../../routes/publication.route.js";
import {
	getPublicationsByProjectId,
	importPublicationsByOrcid,
	saveProjectPublication,
	searchPublicationsByOrcid,
} from "../../services/publication.service.js";

vi.mock("../../services/publication.service.js", () => ({
	searchPublicationsByOrcid: vi.fn(),
	saveProjectPublication: vi.fn(),
	importPublicationsByOrcid: vi.fn(),
	getPublicationsByProjectId: vi.fn(),
}));

vi.mock("../../utitls/publication.helper.js", () => ({
	validateOrcid: vi.fn().mockReturnValue(true),
	mapPublicationDTO: vi.fn((p) => p),
}));

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
	req.clerkId = "clerk_123";
	next();
});

app.use("/api/publications", publicationRoutes);
app.use("/api/projects", ProjectRoutes);

beforeEach(() => {
	vi.clearAllMocks();
});

describe("publication.controller", async () => {
	it("POST /api/publication/search returns publications", async () => {
		searchPublicationsByOrcid.mockResolvedValue([{ title: "Paper 1" }]);

		const res = await request(app)
			.post("/api/publications/search")
			.send({ orcid: "0000-0001-0001-0001" });
		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(searchPublicationsByOrcid).toHaveBeenCalledWith(
			"0000-0001-0001-0001",
		);
	});

	it("POST /api/projects/:projectId/publications saves publications", async () => {
		saveProjectPublication.mockResolvedValue([{ id: 1, title: "Paper 1" }]);

		const res = await request(app)
			.post("/api/projects/1/publications")
			.send({ publications: [{ title: "Paper 1" }] });

		expect(res.status).toBe(201);
		expect(res.body.success).toBe(true);
	});
	it("POST /api/projects/:projectId/publications/import imports publications", async () => {
		importPublicationsByOrcid.mockResolvedValue([{ id: 1, title: "Paper 1" }]);

		const res = await request(app)
			.post("/api/projects/1/publications/import")
			.send({ orcid: "0000-0001-0001-0001" });

		expect(res.status).toBe(201);
		expect(res.body.count).toBe(1);
	});

	it("GET /api/projects/:projectId/publications returns publications", async () => {
		getPublicationsByProjectId.mockResolvedValue([{ id: 1, title: "Paper 1" }]);

		const res = await request(app).get("/api/projects/1/publications");

		expect(res.status).toBe(200);
		expect(res.body.success).toBe(true);
		expect(getPublicationsByProjectId).toHaveBeenCalledWith("clerk_123", "1");
	});
});
