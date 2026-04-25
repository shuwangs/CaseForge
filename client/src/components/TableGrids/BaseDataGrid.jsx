import { AgGridReact, AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";

const modules = [AllCommunityModule];

const BaseDataGrid = ({ rowData = [], columnDefs = [] }) => {
    return (
        <AgGridProvider modules={modules}>
            <div
                className="ag-theme-quartz"
                style={{ height: 500, width: "100%" }}
            >
                <AgGridReact rowData={rowData} columnDefs={columnDefs} />
            </div>
        </AgGridProvider>
    );
};
export default BaseDataGrid;