import { Chart, LinearScale } from "chart.js/auto";
import { useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import useCitation from "../../contexts/useCitation.js";
import AICard from "../ui/AICard.js";
import BaseBtn from "../ui/BaseBtn.js";

Chart.register(LinearScale);

const CitationYearChart = () => {
	const lineChart = useRef(null);
	const { citationYearlyCount, loading, error } = useCitation();
	const yearlyData = citationYearlyCount ?? [];
	const [summary, _setSummary] = useState("");

	const downloadChart = () => {
		const chart = lineChart.current;
		if (!chart) return;

		const imageUrl = chart.toBase64Image();

		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = "citation_trend.png";
		link.click();
	};

	const handleGenerate = () => {
		console.log("hanlde Genenrating AI summaries");
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
		<div>
			<div className="flex justify-between items-center">
				<h1>Citation Trend Over the Years</h1>
			</div>
			<div className="w-full h-[400px] justify-center">
				<Line ref={lineChart} data={data} />
			</div>

			<div>
				<BaseBtn variant="secondary" onClick={downloadChart}>
					Download Chart
				</BaseBtn>

				<BaseBtn onClick={handleGenerate} variant="secondary">
					Generate Summary
				</BaseBtn>
			</div>

			<AICard loading={loading} summary={summary} />
		</div>
	);
};

export default CitationYearChart;
