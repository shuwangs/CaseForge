export const fetchPublications = async (orcidId) => {
	console.log("In apis, resqing orcid is:", orcidId);
	const result = await fetch(`api/publication/search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			orcid: orcidId,
		}),
	});

	if (!result.ok) {
		throw new Error("Fetch publications failed");
	}
	const data = await result.json();

	return data.data;
};


export const postPublications = async (payload) => {
	console.log("In apis,  posting publications to db:", payload);
	const result = await fetch(`api/publication/search`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			payload
		}),
	});

	if (!result.ok) {
		throw new Error("Post publications failed");
	}
	const data = await result.json();

	return data.data;
};
