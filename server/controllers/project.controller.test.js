import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import projectRoutes from "../routes/project.publication.route.js";
import {
	addProject,
	deleteProjectById,
	getProjectsByClerkId,
	updateProjectById,
} from "../services/project.service.js";
import { getUserByClerkId } from "../services/user.service.js";

vi.mock("../services/project.service.js", () => ({
	getProjectsByClerkId: vi.fn(),
	addProject: vi.fn(),
	deleteProjectById: vi.fn(),
	updateProjectById: vi.fn(),
}));

vi.mock("../services/user.service.js", () => ({
	getUserByClerkId: vi.fn(),
}));

const app = express();
app.use(express.json());

app.use((req, _res, next) => {
	req.clerkId = "clerk_123";
	next();
});

app.use("/api/projects", projectRoutes);

describe("project routes integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("GET /api/projects returns projects", async () => {
		getProjectsByClerkId.mockResolvedValue([
			{
				id: 1,
				project_name: "Project 1",
			},
		]);

		const res = await request(app).get("/api/projects");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			success: true,
			data: [
				{
					id: 1,
					project_name: "Project 1",
				},
			],
		});
	});

	it("POST /api/projects to create new project", async () => {
		getUserByClerkId.mockResolvedValue({
			id: 1,
		});

		addProject.mockResolvedValue({
			id: 2,
			project_name: "New project",
		});

		const res = await request(app).post("/api/projects").send({
			projectName: "New project",
		});

		expect(res.status).toBe(201);
		expect(addProject).toHaveBeenCalledWith({
			projectName: "New project",
			userId: 1,
		});
	});

	it("DELETE /api/projects/:id  deletes projects by projectId", async () => {
		deleteProjectById.mockResolvedValue({
			id: 1,
			project_name: "Deleted Project",
		});

		const res = await request(app).delete("/api/projects/1");

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			success: true,
			data: {
				id: 1,
				project_name: "Deleted Project",
			},
		});
	});

	it("PUT /api/projects/id updates project by projectID", async () => {
		updateProjectById.mockResolvedValue([
			{
				id: 1,
				project_name: "Updated Project",
			},
		]);

		const res = await request(app)
			.put("/api/projects/1")
			.send({ projectName: "Updated Project" });

		expect(res.status).toBe(200);

		expect(res.body).toEqual({
			success: true,
			data: [
				{
					id: 1,
					project_name: "Updated Project",
				},
			],
		});
	});
});
