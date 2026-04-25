import useProject from "../../hooks/useProject.js";
import BaseDataGrid from "./BaseDataGrid.jsx";

const publicationColumns = [
	{ field: "title", headerName: "Title", flex: 2 },
	{ field: "publicationDate", headerName: "Date", width: 120 },
	{ field: "journalName", headerName: "Journal", flex: 1 },
];

const PublicationsGrid = ({ projectId, publications }) => {
	const { savePublications } = useProject();

	const handleSavePublications = async () => {
		await savePublications(projectId, publications);
	};

	return (
		<div className="w-full">
			<BaseDataGrid rowData={publications} columnDefs={publicationColumns} />

			<div>
				<button onClick={handleSavePublications}>Save</button>
				<button>Cancel</button>
			</div>
		</div>
	);
};

export default PublicationsGrid;
