import continentMap from "../../utitls/continent.json" with { type: "json" };
import {
	getCitationCountsByYear,
	getCitationMapData,
} from "../citation.service.js";
import { getJournalPublicationData } from "../publication.service.js";
import { generateSummaryProvider } from "./gemini.provider.js";

const system_message = `You are a helpful  professional research impact writing assistant for CaseForge, which is an immigration aid application.
	Your task is to generate concise, evidence-based research impact summaries from structured citation analytics.

	Rules:
	- Use only the data provided in the user message.
	- Do not invent citation counts, years, journals, countries, institutions, or conclusions.
	- Emphasize scholarly recognition and research impact when supported by the data.
	- Do not make legal conclusions or guarantee immigration outcomes.
	- Write 2-5 sentences.
`;

const continentNames = {
	NA: "North America",
	SA: "South America",
	EU: "Europe",
	AS: "Asia",
	AF: "Africa",
	OC: "Oceania",
	AN: "Antarctica",
};

export const generateJournalImpactSummaryService = async (
	projectId,
	clerkId,
) => {
	console.log("In generateJournalImpactSummary service");
	const analytics = await getJournalPublicationData(projectId, clerkId);

	console.log("In generateJournalImpactSummary service: ", analytics);
	const totalJournals = analytics.length;

	const topJournal = analytics.reduce((max, row) => {
		return Number(row.publication_count) > Number(max.publication_count)
			? row
			: max;
	});

	// build analytics
	const insights = {
		totalJournals,
		topJournal: topJournal.journal_name ?? null,
		topJournalPublicationCount: topJournal.citation_count ?? null,
	};

	const user_message = `
	Generate a journal impact summary.
	
	Total published Journals: ${insights.totalJournals}
	Top journal: ${insights.topJournal}
	Publications in top journal: ${insights.topJournalPublicationCount}
	`;

	const summary = await generateSummaryProvider(system_message, user_message);

	return {
		summary,
		analytics,
	};
};

export const generateMapSummaryService = async (projectId, clerkId) => {
	const analytics = await getCitationMapData(projectId, clerkId);

	// Get total continents
	const continents = new Set();

	analytics.forEach((row) => {
		const continentCode = continentMap[row.country];

		const continentName = continentNames[continentCode];

		if (continentName) {
			continents.add(continentName);
		}
	});

	console.log(continents);

	const insights = {
		totalContinents: continents.size,
		continents: [...continents],
		totalCountries: analytics.length,
	};

	const user_message = `
		Generate a geographic research impact summary.

		Total cited countries: ${insights.totalCountries}
		Continents reached: ${insights.totalContinents}
		Continents:	${insights.continents.join(", ")}
	`;

	const summary = await generateSummaryProvider(system_message, user_message);

	return {
		summary,
		analytics,
	};
};

export const generateTrendSummaryService = async (projectId, clerkId) => {
	console.log("In generate Trend summary service");
	// 1. fetch analytics
	const analytics = await getCitationCountsByYear(projectId, clerkId);

	// 2. preprocess the sights
	const totalCitations = analytics.reduce(
		(sum, row) => sum + Number(row.citation_count),
		0,
	);

	const peak = analytics.reduce((max, row) => {
		return Number(row.citation_count) > Number(max.citation_count) ? row : max;
	}, analytics[0]);

	// 3. build insights
	const insights = {
		totalCitations,
		peakYear: peak?.citing_year ?? null,
		peakCitationCount: peak?.citation_count ?? null,
	};

	// 4. prompt = generate prompt

	const user_message = `
	Generate a citation trend summary.
	
	Total citations: ${insights.totalCitations}
	Peak citation year: ${insights.peakYear}
	Peak citation count: ${insights.peakCitationCount}
	`;
	// 5. summary = call AI

	const summary = await generateSummaryProvider(system_message, user_message);

	return {
		summary,
		analytics,
	};
};
