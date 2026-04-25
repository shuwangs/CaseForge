import BaseDataGrid from "./BaseDataGrid.jsx";

const publicationColumns = [
    { field: "title", headerName: "Title", flex: 2 },
    { field: "publicationDate", headerName: "Date", width: 120 },
    { field: "journalName", headerName: "Journal", flex: 1 },
];

const PublicationsGrid = ({ publications }) => {
    return (

        <BaseDataGrid
            rowData={publications}
            columnDefs={publicationColumns}
        />
    );
}

export default PublicationsGrid;