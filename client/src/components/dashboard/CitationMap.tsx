import useCitation from '../../contexts/useCitation.js';
import WorldMap from "react-svg-worldmap";

const CitationMap = () => {
    const data = [
        { country: "cn", citation_count: 25 }, // china
        { country: "in", citation_count: 2 }, // india
        { country: "us", citation_count: 4 }, // united states
        { country: "id", citation_count: 24 }, // indonesia
        { country: "pk", citation_count: 2 }, // pakistan
        { country: "br", citation_count: 3 }, // brazil
        { country: "ng", citation_count: 3 }, // nigeria

    ];

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
    )
}

export default CitationMap;