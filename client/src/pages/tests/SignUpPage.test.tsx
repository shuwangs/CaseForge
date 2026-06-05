import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SignUpPage from "../SignUpPage.tsx";

vi.mock("@clerk/react", () => ({
	SignUp: () => <div data-testid="sign-up" />,
}));

describe("SignUpPage", () => {
	it("renders CaseForge heading and SignIn component", () => {
		render(<SignUpPage />);

		expect(
			screen.getByRole("heading", { name: "CaseForge" }),
		).toBeInTheDocument();
		expect(screen.getByTestId("sign-up")).toBeInTheDocument();
	});
});
