import { useAuth } from "@clerk/react-router";
import { createContext, useState } from "react";

import { fetchPublications, postPublications } from "../apis/publicationAPI.js";

export const PublicationContext = createContext();

export const PublicationProvider = ({ children }) => {
	const { getToken, isSignedIn, isLoaded } = useAuth();

	const [publications, setPublications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const onFetchPublication = async (orcidId) => {
		try {
			setLoading(true);
			setError("");
			const token = await getToken();

			const data = await fetchPublications(orcidId, token);
			setPublications(data);

			return data;
		} catch (err) {
			setError(err.message || "Failed to fetch publications");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const savePublications = async (projectId, payload) => {
		try {
			setError("");
			setLoading(true);

			const token = await getToken();

			console.log("savePublications in the provider :", payload);
			const data = await postPublications(projectId, payload);
			return data;
		} catch (err) {
			setError(err.message || "Failed to save publications");
		} finally {
			setLoading(false);
		}
	};

	const values = {
		publications,
		onFetchPublication,
		savePublications,
	};

	return (
		<PublicationContext.Provider value={values}>
			{children}
		</PublicationContext.Provider>
	);
};
