import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";

const modules = [AllCommunityModule];

const BaseDataGrid = ({
	rowData = [],
	columnDefs = [],
	onGridReady,
	...rest
}) => {
	return (
		<AgGridProvider modules={modules}>
			<div className="ag-theme-quartz" style={{ height: 800, width: "100%" }}>
				<AgGridReact
					rowData={rowData}
					columnDefs={columnDefs}
					pagination={true}
					onGridReady={onGridReady}
					{...rest}
				/>
			</div>
		</AgGridProvider>
	);
};
export default BaseDataGrid;
