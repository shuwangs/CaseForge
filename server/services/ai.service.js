import {
	getCitationCountsByYear,
	getCitationMapData,
} from "./citation.service.js";
import { getJournalPublicationData } from "./publication.service.js";

export const generateJournalImpactSummaryService = async (
	projectId,
	clerkId,
) => {
	console.log("In generateJournalImpactSummary service");
	const analytics = await getJournalPublicationData(projectId, clerkId);

	console.log("In generateJournalImpactSummary service: ", analytics);

	return {
		summary: "Mock AI Journal impact summary",
		analytics,
	};
};
export const generateMapSummaryService = async (projectId, clerkId) => {
	console.log("In generate Map summary service");

	const analytics = await getCitationMapData(projectId, clerkId);

	return {
		summary: "Mock AI map summary",
		analytics,
	};
};

export const generateTrendSummaryService = async (projectId, clerkId) => {
	console.log("In generate Trend summary service");
	// 1.  fetch analytics
	const analytics = await getCitationCountsByYear(projectId, clerkId);
	console.log("Analytics data from  generateTrendSummaryService", analytics);

	return {
		summary: "Mock AI trend summary",
		analytics,
	};
	//   processed = preprocess
	//   insights = build structured insights
	//   prompt = generate prompt
	//   summary = call AI
	// return { summary, insights }
};
