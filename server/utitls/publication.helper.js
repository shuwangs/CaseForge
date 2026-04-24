export const validateOrcid = () => {
	// TODO: implement the logic of validation
	return true;
};
export const extractIds = (idString = "") => {
	const doi = idString.match(/doi:([^\s]+)/i)?.[1] || null;
	const openalexId = idString.match(/openalex:(W\d+)/i)?.[1] || null;
	const pmid = idString.match(/pmid:(\d+)/i)?.[1] || null;

	return { doi, openalexId, pmid };
};
export const parseJournal = (venueString = "") => {
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
export const parsePublisher = (publisherString) => {
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

export const normalizePublication = (rawPublication) => {
	const ids = extractIds(rawPublication.id);
	const journal = parseJournal(rawPublication.venue);
	const publisher = parsePublisher(rawPublication.publisher);

	return {
		title: rawPublication.title || null,
		authors: rawPublication.author || null,
		publicationType: rawPublication.type || null,
		publicationDate: rawPublication.pub_date || null,

		doi: ids.doi,
		openalexId: ids.openalexId,
		pmid: ids.pmid,

		journalName: journal.journalName,
		journalIssns: journal.journalIssns,
		journalOpenalexId: journal.journalOpenalexId,

		publisherName: publisher.publisherName,
		publisherCrossrefId: publisher.publisherCrossrefId,

		rawData: rawPublication,
	};
};

export const normalizePublications = (publicationList) => {
	if (!publicationList || publicationList.length === 0) {
		throw new AppError("No publication is found", 404);
	}

	return publicationList.map((publication) => {
		return normalizePublication(publication);
	});
};
