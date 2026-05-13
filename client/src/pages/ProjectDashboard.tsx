import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CitationCountsTable from "../components/dashboard/CitationCountsTable.tsx";
import CitationYearChart from "../components/dashboard/CitationYearChart.tsx";
import CitationMap from "../components/dashboard/CitationMap.tsx";
import useCitation from "../contexts/useCitation.ts";

const ProjectDashboard = () => {
    const { projectId } = useParams();
    const [activeTab, setActiveTab] = useState("publications");
    const { loadCitationResults } = useCitation();

    useEffect(() => {
        if (!projectId) return;
        loadCitationResults(projectId);
    }, [projectId]);

    return (
        <div>
            <h1>Project Dashboard</h1>

            <div>
                <button
                    onClick={() => setActiveTab("publications")}>
                    Publication Citations
                </button>
                <button
                    onClick={() => setActiveTab("yearlyCounts")}>
                    Yearly Citation Trend
                </button>
                <button
                    onClick={() => setActiveTab("map")}>
                    Citation Map
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "publications" && (
                    <CitationCountsTable />
                )}

                {activeTab === "yearlyCounts" && (
                    <CitationYearChart />
                )}

                {activeTab === "map" && (
                    <CitationMap />
                )}
            </div>
        </div>
    )
}

export default ProjectDashboard;