import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageTitle from "../PageTitle.tsx";

describe("PageTitle", () => {
	it("renders children and passes extra props", () => {
		render(
			<PageTitle className="custom-title" data-testid="page-title">
				Projects
			</PageTitle>,
		);

		const title = screen.getByTestId("page-title");

		expect(title).toHaveTextContent("Projects");
		expect(title.tagName).toBe("H1");
		expect(title).toHaveClass("custom-title");
	});
});
