import WorldMap from "react-svg-worldmap";
import useCitation from "../../contexts/useCitation.js";

const CitationMap = () => {
	const { citationMap, loading, error } = useCitation();

	const mapData = citationMap ?? [];

	if (loading) {
		return <p>Loading citation map...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (!mapData.length) {
		return <p>No citation map data available yet.</p>;
	}
	return (
		<div>
			<WorldMap
				color="red"
				title="Citation Map"
				value-suffix="citations"
				size="lg"
				data={mapData}
			/>
		</div>
	);
};

export default CitationMap;
