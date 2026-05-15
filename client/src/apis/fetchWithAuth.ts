const fetchWithAuth = async (
	token: string,
	url: string,
	options: RequestInit = {},
): Promise<Response> => {
	const headers = new Headers(options.headers);
	headers.set("Authorization", `Bearer ${token}`);
	return fetch(url, {
		...options,
		headers,
	});
};

export default fetchWithAuth;
