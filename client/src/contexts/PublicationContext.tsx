import { useAuth } from "@clerk/react-router";
import { createContext, useCallback, useState } from "react";
import { fetchPublications, loadPublications } from "../apis/publicationAPI.js";

export const PublicationContext = createContext();

export const PublicationProvider = ({ children }) => {
	const { getToken } = useAuth();

	const [publications, setPublications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const onFetchPublication = async (orcidId, projectId) => {
		console.log("in publication context");
		try {
			setLoading(true);
			setError("");
			const token = await getToken();

			const data = await fetchPublications(orcidId, token, projectId);
			setPublications(data);

			return data;
		} catch (err) {
			setError(err.message || "Failed to fetch publications");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const loadProjectPublications = useCallback(
		async (projectId) => {
			try {
				setLoading(true);
				setError("");

				const token = await getToken();
				const data = await loadPublications(projectId, token);
				setPublications(data);
				return data;
			} catch (err) {
				setError(err.message || "Failed to load publications");
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[getToken],
	);

	const values = {
		publications,
		loading,
		error,
		loadProjectPublications,
		onFetchPublication,
		// savePublications,
	};

	return (
		<PublicationContext.Provider value={values}>
			{children}
		</PublicationContext.Provider>
	);
};
