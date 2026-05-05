import { useAuth } from "@clerk/react-router";
import { createContext, useCallback, useEffect, useState } from "react";
import { fetchAllProjects } from "../apis/projectApi.ts";
import { fetchPublications, postPublications } from "../apis/publicationAPI.js";
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const { getToken, isSignedIn, isLoaded } = useAuth();

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
			// const userId = Number(user_id);
			const token = await getToken();

			const data = await fetchAllProjects(token);
			console.log("In context getallprojects: ", data);
			setProjects(data);
		} catch (err) {
			setError(err.message || "Failed to fetch projects");
			throw err;
		} finally {
			setLoading(false);
		}
	}, [getToken]);



	const onFetchPublication = async (orcidId) => {
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
		if (!isLoaded || !isSignedIn) return;

		getAllProjects();
	}, [isLoaded, isSignedIn, getAllProjects]);


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
		onFetchPublication,
		savePublications,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
