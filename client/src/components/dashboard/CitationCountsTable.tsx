import useCitation from "../../contexts/useCitation.js";
import BaseDataGrid from "../ui/BaseDataGrid.jsx";

const citationColumns = [
	{ field: "title", headerName: "Title", flex: 2 },
	{ field: "journal_name", headerName: "Journal", flex: 1 },
	{ field: "publication_date", headerName: "Date", width: 120 },
	{ field: "citation_count", headerName: "Citation Counts", flex: 1 },
];

const CitationCountsTable = () => {
	const { citationCounts } = useCitation();
	return (
		<div>
			Citation Counts Table
			<BaseDataGrid rowData={citationCounts} columnDefs={citationColumns} />
		</div>
	);
};

export default CitationCountsTable;
