import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroContent from "../HeroContent.tsx";

vi.mock("@clerk/react", () => ({
	SignUpButton: ({ children }: { children: React.ReactNode }) => (
		<button type="button">{children}</button>
	),
}));
describe("HeroContent Component", () => {
	it("renders the hero badge and text content successfully", () => {
		render(<HeroContent />);

		expect(
			screen.getByText("AI - powered citation evidence"),
		).toBeInTheDocument();
	});

	it("renders the primary and secondary call-to-action buttons", () => {
		render(<HeroContent />);

		expect(
			screen.getAllByRole("button", { name: /Start Free Analysis/i }).length,
		).toBeGreaterThan(0);

		expect(
			screen.getAllByRole("button", { name: /View Demo/i }).length,
		).toBeGreaterThan(0);
	});
});
