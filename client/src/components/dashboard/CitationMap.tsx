import { useRef } from "react";
import WorldMap from "react-svg-worldmap";
import useCitation from "../../contexts/useCitation.js";
import BaseBtn from "../ui/BaseBtn.js";

const CitationMap = () => {
	const mapRef = useRef(null);
	const { citationMap, loading, error } = useCitation();

	const downloadMap = () => {
		const svgMap = mapRef.current?.querySelector("svg");
		if (!svgMap) return;

		const svgString = new XMLSerializer().serializeToString(svgMap);
		const svgDataBase64 = btoa(unescape(encodeURIComponent(svgString)));
		const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`;

		const image = new Image();

		image.onload = () => {
			const canvas = document.createElement("canvas");
			const width = 1000;
			const height = 600;

			canvas.width = width;
			canvas.height = height;

			const context = canvas.getContext("2d");
			if (!context) return;

			context.fillStyle = "white";
			context.fillRect(0, 0, width, height);
			context.drawImage(image, 0, 0, width, height);

			const pngUrl = canvas.toDataURL("image/png");

			const link = document.createElement("a");
			link.href = pngUrl;
			link.download = "caseforge-citation-map.png";
			link.click();
		};
		image.src = svgDataUrl;
	};

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
			<div className="flex justify-between items-center mb-2">
				<h2>Citaion Map</h2>
				<BaseBtn variant="secondary" onClick={downloadMap}>
					Download Map
				</BaseBtn>
			</div>

			<div ref={mapRef}>
				<WorldMap
					color="#028ca6"
					backgroundColor="white"
					valueSuffix=""
					size="lg"
					data={mapData}
				/>
			</div>
		</div>
	);
};

export default CitationMap;
