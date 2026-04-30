import { createContext, useCallback, useEffect, useState } from "react";
import { addNewProject, fetchAllProjects } from "../apis/projectApi.ts";
import { fetchPublications, postPublications } from "../apis/publicationAPI.js";
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const user_id = 1;
	const [projects, setProjects] = useState([]);
	const [currProjectId, setCurrProjectId] = useState(1);
	const [publications, setPubulications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getAllProjects = useCallback(async (user_id) => {
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
	}, []);

	const createProject = async (payload) => {
		try {
			setLoading(true);
			setError("");

			const data = await addNewProject(payload);
			console.log("In context createProject result: ", data);
			setProjects((prev) => [...prev, data]);
			await fetchAllProjects(user_id);
		} catch (err) {
			setError(err.message || "Failed to fetch publications");
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

	useEffect(() => {
		getAllProjects(user_id);
	}, [getAllProjects]); // Later add user_id into it when user_id is not a constant

	const values = {
		user_id,
		projects,
		currProjectId,
		publications,
		loading,
		error,
		setError,
		getAllProjects,
		createProject,
		setPubulications,
		setCurrProjectId,
		onFetchPubliction,
		savePublications,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
