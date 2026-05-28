import { useRef } from "react";
import { useParams } from "react-router-dom";
import WorldMap from "react-svg-worldmap";
import useCitation from "../../contexts/useCitation.js";
import useSummary from "../../contexts/useSummary.js";
import { downloadMap } from "../../utils/downloadMap.js";
import AICard from "../ui/AICard.js";
import BaseBtn from "../ui/BaseBtn.js";

const CitationMap = () => {
	const mapRef = useRef(null);
	const { projectId } = useParams();
	const { citationMap, loading, error } = useCitation();
	const { mapSummary, handleGenerateMapSummary } = useSummary();

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
			<div className="max-w-4xl flex justify-between items-center mb-2">
				<h2>Citaion Map</h2>
			</div>

			<div ref={mapRef} className="max-w-4xl  flex justify-center">
				<WorldMap
					color="#028ca6"
					backgroundColor="white"
					valueSuffix=""
					size="lg"
					data={mapData}
				/>
			</div>

			<div>
				<BaseBtn
					variant="secondary"
					onClick={() =>
						downloadMap(
							mapRef.current,
							`caseforge-citation-map-${Date.now()}.png`,
						)
					}
				>
					Download Map
				</BaseBtn>
				<BaseBtn
					onClick={() => handleGenerateMapSummary(projectId)}
					variant="secondary"
				>
					Generate Summary
				</BaseBtn>
			</div>

			<AICard loading={loading} summary={mapSummary} />
		</div>
	);
};

export default CitationMap;
