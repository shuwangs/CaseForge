import BaseDataGrid from "./BaseDataGrid.jsx";
import useProject from "../../hooks/useProject.js";
const publicationColumns = [
    { field: "title", headerName: "Title", flex: 2 },
    { field: "publicationDate", headerName: "Date", width: 120 },
    { field: "journalName", headerName: "Journal", flex: 1 },
];

const PublicationsGrid = ({ publications }) => {
    const { savePublications } = useProject();

    const handleSavePublications = async () => {
        await savePublications(publications);
    }

    return (
        <div className="w-full"
        >
            <BaseDataGrid
                rowData={publications}
                columnDefs={publicationColumns}
            />

            <div>
                <button onClick={handleSavePublications}>Save</button>
                <button>Cancel</button>
            </div>
        </div>

    );
}

export default PublicationsGrid;