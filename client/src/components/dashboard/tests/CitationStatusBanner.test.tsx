import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CitationStatusBanner from "../CitationStatusBanner";

// mock useCitation hook
vi.mock("../../../contexts/useCitation.js", () => ({
	default: () => ({
		citationStatus: {
			wait: 2,
			active: 1,
			completed: 7,
			failed: 0,
			total: 10,
		},
		setCitationStatus: vi.fn(),
	}),
}));

describe("CitationStatusBanner", () => {
	it("renders citation processing progress", () => {
		render(<CitationStatusBanner />);

		expect(screen.getByText("Citation Processing")).toBeInTheDocument();

		expect(screen.getByText("Processing")).toBeInTheDocument();

		expect(screen.getByText("70% complete")).toBeInTheDocument();

		expect(
			screen.getByText("Processed 7 of 10 publications"),
		).toBeInTheDocument();
	});
});
