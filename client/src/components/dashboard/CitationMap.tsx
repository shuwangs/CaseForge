import WorldMap from "react-svg-worldmap";
import useCitation from "../../contexts/useCitation.js";

const CitationMap = () => {
	const { citationMap } = useCitation();

	return (
		<div>
			<WorldMap
				color="red"
				title="Citation Map"
				value-suffix="citations"
				size="lg"
				data={citationMap}
			/>
		</div>
	);
};

export default CitationMap;
