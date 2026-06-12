import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ProtectedLayout from "../ProtectedLayout.js";

vi.mock("@clerk/react", () => ({
	Show: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../AppLayout.js", () => ({
	default: () => <div data-testid="app-layout" />,
}));

describe("ProtectedLayout", () => {
	it("renders AppLayout inside signed-in Show Wrapped container", () => {
		render(<ProtectedLayout />);
		expect(screen.getByTestId("app-layout")).toBeInTheDocument();
	});
});
