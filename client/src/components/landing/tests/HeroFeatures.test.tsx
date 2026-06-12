import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroFeatures from "../HeroFeatures.tsx";

vi.mock("@clerk/react", () => ({
	SignUpButton: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));
vi.mock("../ui/FeatureCard.tsx", () => ({
	default: ({ title, description }) => (
		<div data-testid="mock-feature-card">
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	),
}));

describe("HeroFeatures Component", () => {
	it("renders the section headers correctly", () => {
		render(<HeroFeatures />);

		expect(screen.getByText(/Features/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Three simple steps to transform your research record/i),
		).toBeInTheDocument();
	});

	it("renders all three workflow feature cards with correct data", () => {
		render(<HeroFeatures />);

		expect(screen.getAllByText("Fetch Citation Data").length).toBeGreaterThan(
			1,
		);
	});
});
