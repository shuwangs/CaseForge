import { useAuth } from "@clerk/react-router";
import { createContext, useState } from "react";
import {
	fetchPublications,
	loadPublications,
	postPublications,
} from "../apis/publicationAPI.js";
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
			console.log("in publication context fetch data:", data);
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

			console.log("savePublications in the provider:", payload);
			console.log("before getToken");

			const token = await getToken();

			const data = await postPublications(projectId, payload, token);
			return data;
		} catch (err) {
			setError(err.message || "Failed to save publications");
		} finally {
			setLoading(false);
		}
	};

	const loadProjectPublications = async (projectId) => {
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
	};
	const values = {
		publications,
		loading,
		error,
		loadProjectPublications,
		onFetchPublication,
		savePublications,
	};

	return (
		<PublicationContext.Provider value={values}>
			{children}
		</PublicationContext.Provider>
	);
};
