import {
	CsvExportModule,
	type GridApi,
	type GridReadyEvent,
	ModuleRegistry,
} from "ag-grid-community";
import { useRef, useState } from "react";
import useCitation from "../../contexts/useCitation.ts";
import AICard from "../ui/AICard.js";
import BaseBtn from "../ui/BaseBtn.js";
import BaseDataGrid from "../ui/BaseDataGrid.jsx";

const citationColumns = [
	{ field: "title", headerName: "Title", flex: 2 },
	{ field: "journal_name", headerName: "Journal", flex: 1 },
	{ field: "publication_date", headerName: "Date", width: 120 },
	{ field: "citation_count", headerName: "Citation Counts", flex: 1 },
];
ModuleRegistry.registerModules([CsvExportModule]);

const CitationCountsTable = () => {
	const gridApiRef = useRef<GridApi | null>(null);
	const { citationCounts, loading, error } = useCitation();
	const [summary, _setSummary] = useState("");
	const rowData = citationCounts ?? [];

	function onGridReady(params: GridReadyEvent) {
		gridApiRef.current = params.api;
	}
	function onBtnExport() {
		if (gridApiRef.current) {
			gridApiRef.current.exportDataAsCsv({
				fileName: "caseforge-citations.csv",
			});
		} else {
			console.warn("Agrid Api is not ready！");
		}
	}

	const handleGenerate = () => {
		console.log("hanlde Genenrating AI summaries");
	};

	if (loading) {
		return <p>Loading citation counts...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (!rowData.length) {
		return <p>No citation counts available yet.</p>;
	}

	return (
		<div>
			<div className="flex items-align justify-between mb-4">
				<h2>Citation Counts Table</h2>
			</div>

			<BaseDataGrid
				rowData={rowData}
				columnDefs={citationColumns}
				suppressExcelExport={true}
				onGridReady={onGridReady}
			/>

			<div>
				<BaseBtn onClick={onBtnExport} variant="secondary">
					Download CSV
				</BaseBtn>

				<BaseBtn onClick={handleGenerate} variant="secondary">
					Generate Summary
				</BaseBtn>
			</div>

			<AICard loading={loading} summary={summary} />
		</div>
	);
};

export default CitationCountsTable;
