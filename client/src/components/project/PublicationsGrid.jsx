import { useNavigate } from "react-router-dom";
import usePublication from "../../contexts/usePublication.ts";
import BaseDataGrid from "../ui/BaseDataGrid.jsx";

const publicationColumns = [
	{ field: "title", headerName: "Title", flex: 2 },
	{ field: "publicationDate", headerName: "Date", width: 120 },
	{ field: "journalName", headerName: "Journal", flex: 1 },
];

const PublicationsGrid = ({ projectId, publications }) => {
	const { savePublications } = usePublication();
	const navigate = useNavigate();

	const handleSavePublications = async () => {
		console.log("Save button clicked");
		console.log("projectId:", projectId);
		console.log("publications:", publications);

		await savePublications(projectId, publications);
		navigate(`/projects/${projectId}`);
	};

	return (
		<div className="w-full">
			<BaseDataGrid rowData={publications} columnDefs={publicationColumns} />

			<div>
				<button type="submit" onClick={handleSavePublications}>
					Save
				</button>
				<button type="button">Cancel</button>
			</div>
		</div>
	);
};

export default PublicationsGrid;
