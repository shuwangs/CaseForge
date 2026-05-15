import BaseDataGrid from "../ui/BaseDataGrid.jsx";

const publicationColumns = [
	{ field: "title", headerName: "Title", flex: 2 },
	{ field: "publicationDate", headerName: "Date", width: 120 },
	{ field: "journalName", headerName: "Journal", flex: 1 },
];

const PublicationsGrid = ({ publications }) => {
	return (
		<div className="w-full">
			<BaseDataGrid rowData={publications} columnDefs={publicationColumns} />
		</div>
	);
};

export default PublicationsGrid;
