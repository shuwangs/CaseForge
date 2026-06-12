import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AppLayout from "../AppLayout.tsx";

vi.mock("../AppNavbar.tsx", () => ({
	default: () => <div data-testid="app-navbar" />,
}));

vi.mock("../AppSidebar.tsx", () => ({
	default: () => <aside data-testid="app-sidebar" />,
}));

vi.mock("react-router-dom", () => ({
	Outlet: () => <div data-testid="route-outlet">Outlet Content</div>,
}));

describe("AppLayout", () => {
	it("renders navbar, sidebar, and outlet", () => {
		render(<AppLayout />);

		expect(screen.getByTestId("app-navbar")).toBeInTheDocument();
		expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
		expect(screen.getByTestId("route-outlet")).toBeInTheDocument();
	});
});
