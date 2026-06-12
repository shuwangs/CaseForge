import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProjectCard from "../ProjectCard.js";

describe("ProjectCard", () => {
	const project = {
		id: 1,
		userId: "user-1",
		projectName: "Test Project",
		institutionId: "1",
		firstName: "Test",
		lastName: "T",
		researchArea: "AI",
		orcid: "0000-0002-0002-0097",
		careerStage: "Test stage",
		target: "EB-1A",
		createdAt: "2026-05-28T12:00:00.000Z",
	};

	it("it renders project detail and link", () => {
		render(
			<MemoryRouter>
				<ProjectCard project={project} href="/projects/1" />
			</MemoryRouter>,
		);

		expect(screen.getByText("Test Project")).toBeInTheDocument();
		expect(screen.getByText("Name: Test T")).toBeInTheDocument();
		expect(screen.getByText("ORCID: 0000-0002-0002-0097")).toBeInTheDocument();
		expect(screen.getByRole("link")).toHaveAttribute("href", "/projects/1");
	});
});
