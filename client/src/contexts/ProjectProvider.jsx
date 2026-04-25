import { createContext, useState } from "react";
import { fetchPublications, postPublications } from "../apis/publicationAPI.js";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const [project, setProject] = useState(null);
	const [publications, setPubulications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const onFetchPubliction = async (orcidId) => {
		try {
			setLoading(true);
			setError("");

			const data = await fetchPublications(orcidId);
			setPubulications(data);

			return data;
		} catch (err) {
			setError(err.message || "Failed to fetch publications");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const savePublications = async (payload) => {
		try {
			setError("");
			setLoading(true);
			const data = await postPublications(payload);

		} catch (err) {
			setError(err.message || "Failed to save publications");
		} finally {
			setLoading(false);
		}
	}

	const values = {
		project,
		publications,
		setPubulications,
		onFetchPubliction,
		savePublications
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
