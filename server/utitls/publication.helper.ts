import AppError from "../errors/AppError.js";
import type { Publication } from "../types/publication.types.js";

export const validateOrcid = (orcid: string): boolean => {
	const cleaned = orcid.trim();
	const pattern = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;

	if (!pattern.test(cleaned)) return false;

	// Checksum
	// According to https://support.orcid.org/hc/en-us/articles/360006897674-Structure-of-the-ORCID-Identifier
	const digits: string = cleaned.replace(/-/g, "");
	let total: number = 0;
	for (let i: number = 0; i < 15; i++) {
		total = (total + Number(digits[i])) * 2;
	}
	const remainder: number = total % 11;
	const result: number = (12 - remainder) % 11;
	const checkDigit: string = result === 10 ? "X" : String(result);

	return checkDigit === digits[15];
};

export const extractIds = (idString: string = "") => {
	const doi = idString.match(/doi:([^\s]+)/i)?.[1] || null;
	const openalexId = idString.match(/openalex:(W\d+)/i)?.[1] || null;
	const pmid = idString.match(/pmid:(\d+)/i)?.[1] || null;

	return { doi, openalexId, pmid };
};
export const parseJournal = (venueString: string = "") => {
	if (!venueString) {
		return {
			journalName: null,
			issns: [],
			openalexSourceId: null,
			omid: null,
		};
	}
	const journalName = venueString.replace(/\s*\[.*?\]\s*/g, "").trim();

	const journalIssns = [...venueString.matchAll(/issn:([0-9X-]+)/gi)].map(
		(match) => match[1],
	);

	const journalOpenalex = venueString.match(/openalex:(S\d+)/i)?.[1] || null;

	return {
		journalName,
		journalIssns,
		journalOpenalex,
	};
};
export const parsePublisher = (publisherString: string = "") => {
	if (!publisherString) {
		return {
			publisherName: null,
			crossrefId: null,
		};
	}

	const publisherName = publisherString.replace(/\s*\[.*?\]/, "") || null;
	const publisherCrossrefId =
		publisherString.match(/crossref:(\d+)/i)?.[1] || null;
	return {
		publisherName,
		publisherCrossrefId,
	};
};
const normalizeDate = (dateString: string) => {
	if (!dateString) return null;

	// 2021 -> 2021-01-01
	if (/^\d{4}$/.test(dateString)) {
		return `${dateString}-01-01`;
	}

	// 2021-06 -> 2021-06-01
	if (/^\d{4}-\d{2}$/.test(dateString)) {
		return `${dateString}-01`;
	}

	// 2021-06-15
	if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
		return dateString;
	}

	return null;
};

export const normalizePublication = (
	rawPublication: Record<string, unknown>,
): Publication => {
	const ids = extractIds(rawPublication.id as string);
	const journal = parseJournal(rawPublication.venue as string);
	const publisher = parsePublisher(rawPublication.publisher as string);

	return {
		title: (rawPublication.title as string) || null,
		authors: (rawPublication.author as string) || null,
		publicationType: (rawPublication.type as string) || null,
		publicationDate: normalizeDate(rawPublication.pub_date as string) || null,

		doi: ids.doi,
		openalexId: ids.openalexId,
		pmid: ids.pmid,

		journalName: journal.journalName,
		journalIssns: journal.journalIssns,
		journalOpenalexId: journal.journalOpenalex,

		publisherName: publisher.publisherName,
		publisherCrossrefId: publisher.publisherCrossrefId,

		rawData: rawPublication,
	};
};

export const normalizePublications = (
	publicationList: Record<string, unknown>[],
) => {
	if (!publicationList || publicationList.length === 0) {
		throw new AppError("No publication is found", 404);
	}

	return publicationList.map((publication) => {
		return normalizePublication(publication);
	});
};

export const mapPublicationDTO = (publication: Record<string, unknown>) => ({
	id: publication.id,
	title: publication.title,
	authors: publication.authors,
	doi: publication.doi,

	publicationDate: publication.publication_date,
	publicationType: publication.publication_type,
	publicationYear: publication.publication_year,

	journalName: publication.journal_name,
	journalIssns: publication.journal_issns,
	journalOpenalexId: publication.journal_openalex_id,

	publisherName: publication.publisher_name,
	publisherCrossrefId: publication.publisher_crossref_id,

	openalexId: publication.openalex_id,
	pmid: publication.pmid,

	projectId: publication.project_id,
	createdAt: publication.created_at,

	rawData: publication.raw_data,
});
