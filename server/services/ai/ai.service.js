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
	// 1. fetch analytics
	const analytics = await getCitationCountsByYear(projectId, clerkId);

	// 2. preprocess the sights
	const totalCitations = analytics.reduce((sum, row) => sum + Number(row.citation_count), 0)

	const peak = analytics.reduce((max, row) => {
		return Number(row.citation_count) > Number(max.citation_count)
			? row
			: max;
	}, analytics[0]);


	// 3. build insights

	const insights = {
		totalCitations,
		peakYear: peak?.citing_year ?? null,
		peakCitationCount: peak?.citation_count ?? null,
	};

	// 4. prompt = generate prompt
	const system_message = `You are a helpful  professional research impact writing assistant for CaseForge, which is an immigration aid application.
		Your task is to generate concise, evidence-based research impact summaries from structured citation analytics.

		Rules:
		- Use only the data provided in the user message.
		- Do not invent citation counts, years, journals, countries, institutions, or conclusions.
		- Emphasize scholarly recognition and research impact when supported by the data.
		- Do not make legal conclusions or guarantee immigration outcomes.
		- Write 2-4 sentences.
		`

	const user_message = `
	Generate a citation trend summary.
	Total citations: ${insights.totalCitations}
	Peak citation year: ${insights.peakYear}
	Peak citation count: ${insights.peakCitationCount}
	`
	// 5. summary = call AI

	return {
		summary: "Mock AI trend summary",
		analytics,
	};

	// return { summary, insights }
};
