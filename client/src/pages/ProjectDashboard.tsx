import { useState } from "react";
import CitationCountsTable from "../components/dashboard/CitationCountsTable.tsx";

const ProjectDashboard = () => {
    const [activeTab, setActiveTab] = useState("publications");

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
                    onClick={() => setActiveTab("geography")}>
                    Citation Map
                </button>
            </div>

            <div className="mt-6">
                {activeTab === "publications" && (
                    <CitationCountsTable />
                )}

                {activeTab === "yearlyCounts" && (
                    <div>Yearly counts plot</div>
                )}

                {activeTab === "map" && (
                    <div>Citation map</div>
                )}
            </div>
        </div>
    )
}

export default ProjectDashboard;