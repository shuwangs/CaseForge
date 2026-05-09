import AppError from "../errors/AppError.js";

export const fetchCitation = async (workId) => {
    try {
        const OPENALEX_URL = process.env.OPENALEX_URL || "https://api.openalex.org/works?filter=cites:";
        console.log("citation Service fetching url: ", `${OPENALEX_URL}${workId}`);

        const response = await fetch(`${OPENALEX_URL}${workId}`);

        if (!response.ok) {
            throw new Error("Failed to fetch citations");
        }

        const data = await response.json();
        const results = data.results;
        // console.log("in citation server, the top3 citations are ", results[3]);
        return results;

    } catch (err) {
        throw new AppError("citation fetch failed", 500)
    }

}