import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { Project } from "../../types/project.js";
import ProjectOverview from "../ProjectOverview.tsx";

const mockOnDeleteProject = vi.fn();

vi.mock("../../../contexts/useProject.js", () => ({
	default: () => ({
		onDeleteProject: mockOnDeleteProject,
		projects: [],
		currentProject: null,
	}),
}));
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: vi.fn(),
	};
});
const mockProject: Project = {
	id: "proj-123",
	firstName: "Bobo",
	lastName: "Wang",
	orcid: "0000-0002-1825-0097",
	researchArea: "Bioinformatics",
	institution: "Georgia Tech",
	target: "EB-1A",
	createdAt: "2026-05-28T12:00:00.000Z",
};
describe("ProjectOverview", () => {
	it("renders all project information fields correctly", () => {
		render(
			<BrowserRouter>
				<ProjectOverview project={mockProject} />
			</BrowserRouter>,
		);

		expect(screen.getByText("Project Information")).toBeInTheDocument();
		expect(screen.getByText("Bobo Wang")).toBeInTheDocument();
	});
});
