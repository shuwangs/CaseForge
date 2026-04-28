import { createContext, useState } from "react";
import { fetchPublications, postPublications } from "../apis/publicationAPI.js";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const [projects, setProjects] = useState([]);
	const [currProjectId, setCurrProjectId] = useState(1);
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

	const savePublications = async (projectId, payload) => {
		try {
			setError("");
			setLoading(true);
			console.log("savePublications in the provider :", payload);
			const data = await postPublications(projectId, payload);
		} catch (err) {
			setError(err.message || "Failed to save publications");
		} finally {
			setLoading(false);
		}
	};

	const values = {
		projects,
		currProjectId,
		publications,
		setPubulications,
		onFetchPubliction,
		savePublications,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
