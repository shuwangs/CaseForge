import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CitationCountsTable from "../components/dashboard/CitationCountsTable.tsx";
import CitationMap from "../components/dashboard/CitationMap.tsx";
import CitationYearChart from "../components/dashboard/CitationYearChart.tsx";
import PageTitle from "../components/ui/PageTitle.js";
import useCitation from "../contexts/useCitation.ts";
import useSummary from "../contexts/useSummary.js";

const ProjectDashboard = () => {
	const { projectId } = useParams();
	const [activeTab, setActiveTab] = useState("publications");
	const { loadCitationResults } = useCitation();
	const { loadProjectSummary } = useSummary();

	const tabs = [
		{
			id: "publications",
			label: "Publication Citations",
		},
		{
			id: "yearlyCounts",
			label: "Yearly Citation Trend",
		},
		{
			id: "map",
			label: "Citation Map",
		},
	];

	useEffect(() => {
		if (!projectId) return;
		loadCitationResults(projectId);
		loadProjectSummary(projectId);
	}, [projectId, loadCitationResults, loadProjectSummary]);

	return (
		<div>
			<PageTitle>Project Dashboard</PageTitle>
			<div className="mt-2 mb-6 border-b border-gray-200">
				<div className="flex gap-6">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={`					
								border-b-2 px-1 pb-3 
								text-sm 
								font-medium 
								transition-colors
							${
								activeTab === tab.id
									? "border-[var(--color-accent)] text-[var(--color-primary)]	"
									: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
							}
				`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<div className="">
				{activeTab === "publications" && <CitationCountsTable />}

				{activeTab === "yearlyCounts" && <CitationYearChart />}

				{activeTab === "map" && <CitationMap />}
			</div>
		</div>
	);
};

export default ProjectDashboard;
