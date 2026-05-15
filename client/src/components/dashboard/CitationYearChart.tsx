import { Chart, LinearScale } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import useCitation from "../../contexts/useCitation.js";

Chart.register(LinearScale);

const CitationYearChart = () => {
	const { citationYearlyCount, loading, error } = useCitation();

	const yearlyData = citationYearlyCount ?? [];

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
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	return (
		<div>
			<Line data={data} />
		</div>
	);
};

export default CitationYearChart;
