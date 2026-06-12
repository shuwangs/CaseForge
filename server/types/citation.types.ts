export type OpenAlexInstitution = {
	display_name?: string;
	country_code?: string;
	type?: string;
};

export type OpenAlexAuthorship = {
	author?: { display_name?: string };
	institutions?: OpenAlexInstitution[];
};

export type OpenAlexWork = {
	id?: string;
	title?: string;
	publication_year?: number;
	type?: string;
	authorships?: OpenAlexAuthorship[];
	primary_location?: {
		source?: { display_name?: string };
	};
	ids?: {
		doi?: string;
		pmid?: string;
	};
};

export type NormalizedCitation = {
	normalized: {
		citing_title: string | undefined;
		citing_authors: string | undefined;
		citing_journal: string | undefined;
		citing_year: number | undefined;
		citing_type: string | undefined;
		doi: string | undefined;
		openalex_id: string | undefined;
		pmid: string | undefined;
		raw_data: OpenAlexWork;
	};
	citation_institutions: {
		institution_name: string | undefined;
		country: string | undefined;
		institution_type: string | undefined;
	}[];
};
