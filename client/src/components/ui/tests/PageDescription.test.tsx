import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PageDescription from "../PageDescription.js";

describe("PageDescription", () => {
	it("renders children and passes extra props", () => {
		render(
			<PageDescription
				className="customize-description"
				data-testid="page-description"
			>
				Test Page Description
			</PageDescription>,
		);

		const description = screen.getByTestId("page-description");
		expect(description).toHaveTextContent("Test Page Description");
		expect(description).toHaveClass("customize-description");
	});
});
