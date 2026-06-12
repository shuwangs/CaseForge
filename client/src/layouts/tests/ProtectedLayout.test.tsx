import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import ProtectedLayout from "../ProtectedLayout.js";

vi.mock("@clerk/react", () => ({
	Show: ({
		children,
		when,
	}: {
		children: React.ReactNode;
		when: "signed-in" | "signed-out";
	}) => (when === "signed-in" ? <>{children}</> : null),
}));

vi.mock("../AppLayout.js", () => ({
	default: () => <div data-testid="app-layout" />,
}));

describe("ProtectedLayout", () => {
	it("renders AppLayout inside signed-in Show Wrapped container", () => {
		render(
			<MemoryRouter>
				<ProtectedLayout />
			</MemoryRouter>,
		);
		expect(screen.getByTestId("app-layout")).toBeInTheDocument();
	});
});
