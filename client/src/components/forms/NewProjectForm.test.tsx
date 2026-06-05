import "@testing-library/jest-dom/vitest";
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import NewProjectForm from "./NewProjectForm.tsx";

const mockUseProject = vi.hoisted(() => vi.fn());

vi.mock("../../contexts/useProject.js", () => ({
	default: () => mockUseProject(),
}));

describe("NewProjectForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseProject.mockReturnValue({ error: "" });
	});

	afterEach(() => {
		cleanup();
	});

	const initialValues = {
		userId: "user-1",
		projectName: "Test Project",
		firstName: "Tester",
		lastName: "T",
		institution: "T",
		researchArea: "AI",
		orcid: "0000-0002-0002-0003",
		careerStage: "Postdoc",
		target: "EB1A",
	};

	it("renders form fields with initial values", () => {
		render(
			<NewProjectForm
				initialValues={initialValues}
				mode="create"
				onSubmit={vi.fn()}
			/>,
		);

		expect(screen.getByLabelText("Project Name")).toHaveValue("Test Project");
		expect(screen.getByLabelText("First Name")).toHaveValue("Tester");
		expect(screen.getByLabelText("Last Name")).toHaveValue("T");
		expect(screen.getByLabelText("Institution / Organization*")).toHaveValue(
			"T",
		);
		expect(screen.getByLabelText("Research Field")).toHaveValue("AI");
		expect(screen.getByLabelText("Career Stage")).toHaveValue("Postdoc");
		expect(screen.getByLabelText("Orcid ID")).toHaveValue(
			"0000-0002-0002-0003",
		);
		expect(screen.getByLabelText("Petition Type")).toHaveValue("EB1A");
		expect(
			screen.getByRole("button", { name: "Create Project" }),
		).toBeInTheDocument();
	});

	it("submits updated form values", async () => {
		const onSubmit = vi.fn().mockResolvedValue({ id: 1 });

		render(
			<NewProjectForm
				initialValues={initialValues}
				mode="create"
				onSubmit={onSubmit}
			/>,
		);

		fireEvent.change(screen.getByLabelText("Project Name"), {
			target: {
				name: "projectName",
				value: "Updated Project",
			},
		});

		fireEvent.change(screen.getByLabelText("Petition Type"), {
			target: {
				name: "target",
				value: "NIW",
			},
		});

		fireEvent.click(screen.getByRole("button", { name: "Create Project" }));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith({
				...initialValues,
				projectName: "Updated Project",
				target: "NIW",
			});
		});
	});

	it("resets form values when Clear is clicked", () => {
		render(
			<NewProjectForm
				initialValues={initialValues}
				mode="create"
				onSubmit={vi.fn()}
			/>,
		);

		fireEvent.change(screen.getByLabelText("Project Name"), {
			target: {
				name: "projectName",
				value: "Changed Project",
			},
		});

		expect(screen.getByLabelText("Project Name")).toHaveValue(
			"Changed Project",
		);

		fireEvent.click(screen.getByRole("button", { name: "Clear" }));

		expect(screen.getByLabelText("Project Name")).toHaveValue("Test Project");
	});

	it("renders edit mode submit text and project error", () => {
		mockUseProject.mockReturnValue({ error: "Project save failed" });

		render(
			<NewProjectForm
				initialValues={initialValues}
				mode="edit"
				onSubmit={vi.fn()}
			/>,
		);

		expect(
			screen.getByRole("button", { name: "Save Changes" }),
		).toBeInTheDocument();
		expect(screen.getByText("Project save failed")).toBeInTheDocument();
	});
});
