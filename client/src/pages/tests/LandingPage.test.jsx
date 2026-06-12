import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingPage from "../LandingPage.jsx";

vi.mock("../../components/landing/HeroNavbar.jsx", () => ({
	default: () => <div data-testid="hero-navbar" />,
}));

vi.mock("../../components/landing/HeroContent.jsx", () => ({
	default: () => <div data-testid="hero-content" />,
}));

vi.mock("../../components/landing/HeroFeatures.jsx", () => ({
	default: () => <div data-testid="hero-features" />,
}));

describe("LandingPage", () => {
	it("render landing page sections", () => {
		render(<LandingPage />);

		expect(screen.getByTestId("hero-navbar")).toBeInTheDocument();
		expect(screen.getByTestId("hero-content")).toBeInTheDocument();
		expect(screen.getByTestId("hero-features")).toBeInTheDocument();
	});
});
