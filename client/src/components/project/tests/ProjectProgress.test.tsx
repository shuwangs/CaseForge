import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectProgress from "../ProjectProgress.tsx";

describe("ProjectProgress test", () => {
	it("shows 'Import publications' as next step when hasPublications is false", () => {
		render(<ProjectProgress hasPublications={false} hasCitations={false} />);
		expect(
			screen.getByText("Next step: Import publications"),
		).toBeInTheDocument();
	});

	it("shows 'Import Citation' as next step when hasPublications is true and hasCitations is false", () => {
		render(<ProjectProgress hasPublications={true} hasCitations={false} />);
		expect(screen.getByText("Next step: Fetch citations")).toBeInTheDocument();
	});

	it("shows 'View Dashboard' as next step when hasPublications is true and hasCitations is false", () => {
		render(<ProjectProgress hasPublications={true} hasCitations={true} />);
		expect(screen.getByText("Next step: View dashboard")).toBeInTheDocument();
	});
});
