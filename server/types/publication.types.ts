export type Publication = {
	project_id?: number | null;
	title: string | null;
	authors: string | null;
	publicationType: string | null;
	publicationDate: string | null;

	doi: string | null;
	openalexId: string | null;
	pmid: string | null;

	journalName: string | null;
	journalIssns: string[] | null;
	journalOpenalexId: string | null;

	publisherName: string | null;
	publisherCrossrefId: string | null;

	rawData: Record<string, unknown>;
};
