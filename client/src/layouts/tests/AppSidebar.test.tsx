import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AppSidebar from "../AppSidebar.tsx";

vi.mock("../../components/dashboard/CitationStatusBanner.tsx", () => ({
	default: () => <div data-testid="citation-status-banner" />,
}));

describe("AppSidebar", () => {
	it("renders base navigation links without project-specific links", () => {
		render(
			<MemoryRouter initialEntries={["/projects"]}>
				<Routes>
					<Route path="/projects" element={<AppSidebar />} />
				</Routes>
			</MemoryRouter>,
		);

		expect(screen.getByRole("link", { name: /Projects/i })).toHaveAttribute(
			"href",
			"/projects",
		);

		expect(screen.getByRole("link", { name: /New Analysis/i })).toHaveAttribute(
			"href",
			"/projects/new",
		);
	});
});
