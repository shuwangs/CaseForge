import {
	CsvExportModule,
	type GridApi,
	type GridReadyEvent,
	ModuleRegistry,
} from "ag-grid-community";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import useCitation from "../../contexts/useCitation.ts";
import useSummary from "../../contexts/useSummary.js";
import AICard from "../ui/AICard.js";
import BaseBtn from "../ui/BaseBtn.js";
import BaseDataGrid from "../ui/BaseDataGrid.jsx";

const journalColumns = [
	{ field: "journal_name", headerName: "Journal", flex: 2 },
	{ field: "publication_count", headerName: "Publication Count", flex: 1 },
];
ModuleRegistry.registerModules([CsvExportModule]);

const CitationCountsTable = () => {
	const gridApiRef = useRef<GridApi | null>(null);
	const { projectId } = useParams();
	const { handleGenerateJournalTableSummary, journalTableSummary } =
		useSummary();
	const { journalPublicationData, loading, error } = useCitation();

	const rowData = journalPublicationData ?? [];

	function onGridReady(params: GridReadyEvent) {
		gridApiRef.current = params.api;
	}
	function onBtnExport() {
		if (gridApiRef.current) {
			gridApiRef.current.exportDataAsCsv({
				fileName: `caseforge-citations-${Date.now()}.csv`,
			});
		} else {
			console.warn("Agrid Api is not ready!");
		}
	}

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
		<div className="space-y-2">
			<div className="caseforge-grid">
				<BaseDataGrid
					rowData={rowData}
					columnDefs={journalColumns}
					suppressExcelExport={true}
					onGridReady={onGridReady}
					height={400}
				/>
			</div>

			<div className="flex gap-2">
				<BaseBtn onClick={onBtnExport} variant="secondary">
					Download CSV
				</BaseBtn>

				<BaseBtn
					onClick={() => handleGenerateJournalTableSummary(projectId)}
					variant="secondary"
				>
					Generate Summary
				</BaseBtn>
			</div>

			<AICard loading={loading} summary={journalTableSummary} />
		</div>
	);
};

export default CitationCountsTable;
