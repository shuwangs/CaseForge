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

import { SummaryContext } from "../../contexts/SummaryContext.js";
import CitationCountsTable from "./CitationCountsTable.tsx";

const mockSummaryContext = {
	loading: false,
	error: "",
	trendSummary: "",
	mapSummary: "",
	journalImpactSummary: "",
	handleGenerateTrendSummary: vi.fn(),
	handleGenerateMapSummary: vi.fn(),
	handleGenerateJournalImpactSummary: vi.fn(),
};

describe("CitationCountsTable", () => {
	it("render citation rows", () => {
		render(
			<SummaryContext.Provider value={mockSummaryContext}>
				<CitationCountsTable />
			</SummaryContext.Provider>,
		);

		expect(screen.getByText("Paper 1")).toBeInTheDocument();
	});
});
