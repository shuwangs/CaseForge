import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../contexts/useCitation.ts", () => ({
	default: () => ({
		journalPublicationData: [
			{
				id: 1,
				journal_name: "Nature",
				publication_count: 5,
			},
		],
	}),
}));

vi.mock("../ui/BaseDataGrid.jsx", () => ({
	default: ({ rowData }) => (
		<div>
			{rowData.map((row) => (
				<div key={row.id}>{row.journal_name}</div>
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

		expect(screen.getByText("Nature")).toBeInTheDocument();
	});
});
