import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeroNavbar from "../HeroNavbar.tsx";

vi.mock("@clerk/react", () => ({
	Show: ({ children }: { children: React.ReactNode }) => <>{children}</>,
	SignInButton: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
	SignUpButton: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
	UserButton: () => <div data-testid="user-button" />,
}));

describe("HeroNavbar", () => {
	it("renders brand, nav links, and auth buttons", () => {
		render(<HeroNavbar />);

		expect(screen.getByText("Case")).toBeInTheDocument();
		expect(screen.getByText("Forge")).toBeInTheDocument();
		expect(screen.getByText("Features")).toHaveAttribute("href", "#features");
		expect(screen.getByText("How it Works")).toHaveAttribute(
			"href",
			"#workflow",
		);
		expect(screen.getByText("Pricing")).toHaveAttribute("href", "#pricing");
		expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Start Free" }),
		).toBeInTheDocument();
		expect(screen.getByTestId("user-button")).toBeInTheDocument();
	});
});
