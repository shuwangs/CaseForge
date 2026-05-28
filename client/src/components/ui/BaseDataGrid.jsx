import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import "../../index.css";
const modules = [AllCommunityModule];

const BaseDataGrid = ({
	rowData = [],
	columnDefs = [],
	height = 800,
	onGridReady,
	...rest
}) => {
	return (
		<AgGridProvider modules={modules}>
			<div className="ag-theme-quartz " style={{ height, width: "100%" }}>
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
