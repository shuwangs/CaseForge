import { Chart, LinearScale } from "chart.js/auto";
import { useRef } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import useCitation from "../../contexts/useCitation.js";
import useSummary from "../../contexts/useSummary.js";
import AICard from "../ui/AICard.js";
import BaseBtn from "../ui/BaseBtn.js";

Chart.register(LinearScale);

const CitationYearChart = () => {
	const lineChart = useRef(null);
	const { projectId } = useParams();
	const { citationYearlyCount, loading, error } = useCitation();
	const { handleGenerateTrendSummary, trendSummary } = useSummary();
	const yearlyData = citationYearlyCount ?? [];

	const downloadChart = () => {
		const chart = lineChart.current;
		if (!chart) return;

		const imageUrl = chart.toBase64Image();

		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = `citation-trend-${Date.now()}.png`;
		link.click();
	};

	if (loading) {
		return <p>Loading citation trend data...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (!yearlyData.length) {
		return <p>No citation trend data available yet.</p>;
	}

	const data = {
		labels: yearlyData.map((data) => data.citing_year),
		datasets: [
			{
				label: "Citation Trend Over the Years",
				data: yearlyData.map((data) => data.citation_count),
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "white",
			},
		],
	};

	return (
		<div className="space-y-2">
			<div className="w-full h-[300px] justify-center">
				<Line ref={lineChart} data={data} />
			</div>

			<div>
				<BaseBtn variant="secondary" onClick={downloadChart}>
					Download Chart
				</BaseBtn>

				<BaseBtn
					onClick={() => handleGenerateTrendSummary(projectId)}
					variant="secondary"
				>
					Generate Summary
				</BaseBtn>
			</div>

			<AICard loading={loading} summary={trendSummary} />
		</div>
	);
};

export default CitationYearChart;
