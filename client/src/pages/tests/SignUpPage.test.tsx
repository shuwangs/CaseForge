import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { , MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import SignUpPage from "../SignUpPage.tsx";

vi.mock("@clerk/react", () => ({
	SignUp: () => <div data-testid="sign-up" />,
}));

describe("SignUpPage", () => {
	it("renders CaseForge heading and SignIn component", () => {
		render(
			<MemoryRouter>
				<SignUpPage />
			</MemoryRouter>,
		);

		expect(screen.getByRole("link", { name: "CaseForge" })).toBeInTheDocument();
		expect(screen.getByTestId("sign-up")).toBeInTheDocument();
	});
});
