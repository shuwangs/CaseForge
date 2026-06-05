import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AppNavbar from "../AppNavbar.tsx";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", () => ({
	useNavigate: () => mockNavigate,
}));

vi.mock("@clerk/react", () => ({
	Show: ({ children }: { children: React.ReactNode }) => <>{children}</>,
	UserButton: () => <div data-testid="user-button" />,
}));

afterEach(() => {
	cleanup();
	vi.clearAllMocks();
});

describe("AppNavbar", () => {
	it("renders brand button and user button", () => {
		render(<AppNavbar />);

		expect(
			screen.getByRole("button", { name: "CaseForge" }),
		).toBeInTheDocument();
		expect(screen.getByTestId("user-button")).toBeInTheDocument();
	});

	it("navigates to projects when brand button is clicked", () => {
		render(<AppNavbar />);

		fireEvent.click(screen.getByRole("button", { name: "CaseForge" }));

		expect(mockNavigate).toHaveBeenCalledWith("/projects");
	});
});
