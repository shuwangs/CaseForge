import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../contexts/useCitation.ts", () => ({
	default: () => ({
		citationCounts: [
			{
				id: 1,
				title: "Paper 1",
				journal_name: "Nature",
				publication_date: "2024",
				citation_count: 5,
			},
		],
	}),
}));

vi.mock("../ui/BaseDataGrid.jsx", () => ({
	default: ({ rowData }) => (
		<div>
			{rowData.map((row) => (
				<div key={row.id}>{row.title}</div>
			))}
		</div>
	),
}));

import CitationCountsTable from "./CitationCountsTable.tsx";

describe("CitationCountsTable", () => {
	it("render citation rows", () => {
		render(<CitationCountsTable />);

		expect(screen.getByText("Paper 1")).toBeInTheDocument();
	});
});
