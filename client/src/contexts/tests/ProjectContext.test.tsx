import "@testing-library/jest-dom/vitest";
import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { useContext } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
    updateProject,
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

            <button
                type="button"
                onClick={() => createProject({ name: "New Project" })}
            >
                Add Project
            </button>
            <button type="button" onClick={() => onDeleteProject(1)}>
                Delete Project 1
            </button>
            <button
                type="button"
                onClick={() => onUpdateProject(1, { name: "Updated" })}
            >
                Update Project 1
            </button>
            <button type="button" onClick={() => getProjectStatus(1)}>
                Get Status 1
            </button>

            <ul>
                {projects.map((p) => (
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

    afterEach(() => {
        cleanup();
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

    it("it add new project ", async () => {
        vi.mocked(fetchAllProjects).mockResolvedValue([]);
        vi.mocked(addNewProject).mockResolvedValue({ id: 3, name: "New Project" });

        render(
            <ProjectProvider>
                <TestConsumer />
            </ProjectProvider>,
        );

        await waitFor(() => {
            expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
        });

        const createBtn = screen.getByText("Add Project");
        fireEvent.click(createBtn);
        await waitFor(() => {
            expect(addNewProject).toHaveBeenCalledWith(
                { name: "New Project" },
                "mock-clerk-token",
            );
        });

        await waitFor(() => {
            expect(screen.getByTestId("projects-count")).toHaveTextContent("1");
        });
        expect(screen.getByText("New Project")).toBeInTheDocument();
    });

    it("it delete a project ", async () => {
        const mockProjects = [
            { id: 1, name: "Project 1" },
            { id: 2, name: "Project 2" },
        ];

        vi.mocked(fetchAllProjects).mockResolvedValue(mockProjects);

        vi.mocked(deleteProject).mockResolvedValue({ success: true });
        render(
            <ProjectProvider>
                <TestConsumer />
            </ProjectProvider>,
        );

        await waitFor(() => {
            expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
        });
        expect(screen.getByTestId("projects-count")).toHaveTextContent("2");

        const deleteBtn = screen.getByText("Delete Project 1");
        fireEvent.click(deleteBtn);

        await waitFor(() => {
            expect(deleteProject).toHaveBeenCalledWith(1, "mock-clerk-token");
        });

        await waitFor(() => {
            expect(screen.getByTestId("projects-count")).toHaveTextContent("1");
        });
        expect(screen.getByText("Project 2")).toBeInTheDocument();

        expect(screen.queryByText("Project 1")).not.toBeInTheDocument();
    });

    it("it update a project ", async () => {
        const mockProjects = [
            { id: 1, name: "Project 1" },
            { id: 2, name: "Project 2" },
        ];

        // first time get all the mockProjects
        vi.mocked(fetchAllProjects).mockResolvedValue(mockProjects);
        // mock update projects
        vi.mocked(updateProject).mockResolvedValue({
            id: 1,
            name: "Updated Project 1",
        });

        render(
            <ProjectProvider>
                <TestConsumer />
            </ProjectProvider>,
        );

        // wait for the screen to update
        await waitFor(() => {
            expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
        });

        expect(screen.getByTestId("projects-count")).toHaveTextContent("2");

        // the updated projects
        const updatedProjects = [
            { id: 1, name: "Updated Project 1" },
            { id: 2, name: "Project 2" },
        ];
        vi.mocked(fetchAllProjects).mockResolvedValueOnce(updatedProjects);

        const updateBtn = screen.getByText("Update Project 1");
        fireEvent.click(updateBtn);

        await waitFor(() => {
            expect(updateProject).toHaveBeenCalledWith(
                1,
                { name: "Updated" },
                "mock-clerk-token",
            );
        });

        await waitFor(() => {
            expect(screen.getByTestId("projects-count")).toHaveTextContent("2");
            expect(screen.getByText("Updated Project 1")).toBeInTheDocument();
            expect(screen.queryByText("Project 1")).not.toBeInTheDocument();
        });
    });

    it("get project Status successfully", async () => {
        vi.mocked(fetchAllProjects).mockResolvedValue([]);

        const mockStatusResponse = { status: "Active", progress: 80 };
        vi.mocked(fetchProjectStatus).mockResolvedValue(mockStatusResponse);

        render(
            <ProjectProvider>
                <TestConsumer />
            </ProjectProvider>,
        );

        await waitFor(() => {
            expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
        });

        const getStatusBtn = screen.getByText("Get Status 1");
        fireEvent.click(getStatusBtn);

        await waitFor(() => {
            expect(fetchProjectStatus).toHaveBeenCalledWith(1, "mock-clerk-token");
        });

        await waitFor(() => {
            expect(screen.getByTestId("status")).toHaveTextContent("Active");
            expect(screen.getByTestId("loading")).toHaveTextContent("Idle");
        });
    });
});
