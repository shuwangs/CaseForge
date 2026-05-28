import { useContext } from "react";
import { SummaryContext } from "./SummaryContext.js";

const useSummary = () => {
	const context = useContext(SummaryContext);
	if (!context) {
		throw new Error("useSummary must be used within a SummaryContext");
	}
	return context;
};
export default useSummary;
