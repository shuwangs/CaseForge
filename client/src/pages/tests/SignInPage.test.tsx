import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SignInPage from "../SignInPage.tsx";

vi.mock("@clerk/react", () => ({
	SignIn: (props: { path: string; routing: string; signUpUrl: string }) => (
		<div data-testid="sign-in">
			{props.path} {props.routing} {props.signUpUrl}
		</div>
	),
}));

describe("SignInPage", () => {
	it("renders CaseForge heading and SignIn component", () => {
		render(<SignInPage />);

		expect(
			screen.getByRole("heading", { name: "CaseForge" }),
		).toBeInTheDocument();
		expect(screen.getByTestId("sign-in")).toHaveTextContent("/sign-in");
	});
});
