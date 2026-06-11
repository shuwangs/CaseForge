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
