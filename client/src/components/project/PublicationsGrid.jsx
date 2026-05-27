import BaseDataGrid from "../ui/BaseDataGrid.jsx";

const publicationColumns = [
	{ field: "title", headerName: "Title", flex: 2 },
	{
		field: "publicationDate",
		headerName: "Date",
		width: 120,
		valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
	},
	{ field: "journalName", headerName: "Journal", flex: 1 },
];

const PublicationsGrid = ({ publications, ...gridProps }) => {
	return (
		<div className="w-full caseforge-grid">
			<BaseDataGrid
				rowData={publications}
				columnDefs={publicationColumns}
				height={500}
				{...gridProps}
			/>
		</div>
	);
};

export default PublicationsGrid;
