export const normCitationFetch = (work) => {
	const normalized = {
		citing_title: work.title,
		citing_authors: work.authorships
			?.map((a) => a.author?.display_name)
			.join(", "),

		citing_journal: work.primary_location?.source?.display_name,
		citing_year: work.publication_year,
		citing_type: work.type,
		doi: work.ids?.doi?.replace("https://doi.org/", ""),
		openalex_id: work.id?.replace("https://openalex.org/", ""),
		pmid: work.ids?.pmid?.replace("https://pubmed.ncbi.nlm.nih.gov/", ""),
		raw_data: work,
	};

	const authorships = work.authorships || [];
	const citation_institutions = [];

	for (const author of authorships) {
		if (!author.institutions?.length) continue;

		citation_institutions.push({
			institution_name: author.institutions[0].display_name,
			country: author.institutions[0].country_code,
			institution_type: author.institutions[0].type,
		});
	}

	return { normalized, citation_institutions };
};

export const normCitationList = (citationList = []) => {
	if (!Array.isArray(citationList)) {
		console.log("citationList is not an array:", citationList);
		return [];
	}

	return citationList.map((cite) => normCitationFetch(cite));
};
