import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroContent from "../HeroContent.tsx";

describe("HeroContent Component", () => {
	it("renders the hero badge and text content successfully", () => {
		render(<HeroContent />);

		expect(
			screen.getByText("AI-powered citation evidence"),
		).toBeInTheDocument();
	});

	it("renders the primary and secondary call-to-action buttons", () => {
		render(<HeroContent />);

		const buttons = screen.getAllByRole("button");

		expect(buttons[0]).toHaveTextContent("Start Free Analysis");
		expect(buttons[1]).toHaveTextContent("View Demo");
	});
});
