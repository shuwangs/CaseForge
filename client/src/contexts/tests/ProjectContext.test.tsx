import "@testing-library/jest-dom/vitest";
import { getToken, useAuth } from "@clerk/react";
import { render, screen, waitFor } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProjectContext, ProjectProvider } from "../ProjectContext.jsx";

// Mock Clerk
const mockGetToken = vi.fn().mockResolvedValue("mock-clerk-token");
vi.mock("@clerk/react-router", () => ({
	useAuth: () => ({
		getToken: mockGetToken,
		isSignedIn: true,
		isLoaded: true,
	}),
}));

// Mock api
vi.mock("../../apis/projectApi.ts", () => ({
	fetchAllProjects: vi.fn(),
	addNewProject: vi.fn(),
	deleteProject: vi.fn(),
	fetchProjectStatus: vi.fn(),
	updateProject: vi.fn(),
}));

import {
	addNewProject,
	deleteProject,
	fetchAllProjects,
	fetchProjectStatus,
} from "../../apis/projectApi.ts";

const TestConsumer = () => {
	const {
		projects,
		loading,
		error,
		projectStatus,
		createProject,
		onDeleteProject,
		onUpdateProject,
		getProjectStatus,
	} = useContext(ProjectContext);

	return (
		<div>
			<div data-testid="loading">{loading ? "Loading..." : "Idle"}</div>
			<div data-testid="error">{error}</div>
			<div data-testid="projects-count">{projects.length}</div>
			<div data-testid="status">
				{projectStatus ? projectStatus.status : "No Status"}
			</div>

			<button onClick={() => createProject({ name: "New Project" })}>
				Add Project
			</button>
			<button onClick={() => onDeleteProject(1)}>Delete Project 1</button>
			<button onClick={() => onUpdateProject(1, { name: "Updated" })}>
				Update Project 1
			</button>
			<button onClick={() => getProjectStatus(1)}>Get Status 1</button>

			<ul>
				{projects.map((p: any) => (
					<li key={p.id} data-testid="project-item">
						{p.name}
					</li>
				))}
			</ul>
		</div>
	);
};

// Start testing
describe("Project Context and Project Provider", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("get all the projects when login in with auth", async () => {
		const mockProjects = [
			{ id: 1, name: "Project 1" },
			{ id: 2, name: "Project 2" },
		];

		vi.mocked(fetchAllProjects).mockResolvedValue(mockProjects);

		render(
			<ProjectProvider>
				<TestConsumer />
			</ProjectProvider>,
		);

		expect(screen.getByTestId("loading")).toHaveTextContent("Loading...");
		await waitFor(() => {
			expect(screen.getByTestId("projects-count")).toHaveTextContent("2");
		});
		expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
		expect(fetchAllProjects).toHaveBeenCalledWith("mock-clerk-token");
	});
});
