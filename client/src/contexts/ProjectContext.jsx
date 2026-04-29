import { createContext, useCallback, useEffect, useState } from "react";
import { fetchAllProjects } from "../apis/projectApi.ts";
import { fetchPublications, postPublications } from "../apis/publicationAPI.js";
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const user_id = 1;
	const [projects, setProjects] = useState([]);
	const [currProjectId, setCurrProjectId] = useState(1);
	const [publications, setPubulications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getAllProjects = async (user_id) => {
		try {
			setLoading(true);
			setError("");
			const userId = Number(user_id);
			const data = await fetchAllProjects(userId);
			console.log("In context getallprojects: ", data);
			setProjects(data);
		} catch (err) {
			setError(err.message || "Failed to fetch projects");
			throw err;
		} finally {
			setLoading(false);
		}
	};

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
			return data;
		} catch (err) {
			setError(err.message || "Failed to save publications");
		} finally {
			setLoading(false);
		}
	};

	const fetchData = useCallback(async () => {
		await getAllProjects(user_id);
	}, [user_id])

	useEffect(() => {
		fetchData();
	}, [fetchData])

	const values = {
		user_id,
		projects,
		currProjectId,
		publications,
		loading,
		error,
		getAllProjects,
		setPubulications,
		setCurrProjectId,
		onFetchPubliction,
		savePublications,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
