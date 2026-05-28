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

			<div className="flex rounded-xl bg-gray-100 py-4 w-fit">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						onClick={() => setActiveTab(tab.id)}
						className={`
							px-4 py-2
							text-sm font-medium
							transition
							${
								activeTab === tab.id
									? "bg-[var(--color-accent)] text-white shadow-sm"
									: "bg-gray-200 text-gray-600 hover:bg-white"
							}
				`}
					>
						{tab.label}
					</button>
				))}
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
