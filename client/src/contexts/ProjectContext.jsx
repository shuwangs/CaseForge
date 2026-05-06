import { useAuth } from "@clerk/react-router";
import { createContext, useCallback, useEffect, useState } from "react";
import {
	addNewProject,
	deleteProject,
	fetchAllProjects,
	updateProject,
} from "../apis/projectApi.ts";
import { fetchPublications, postPublications } from "../apis/publicationAPI.js";
export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const { getToken, isSignedIn, isLoaded } = useAuth();

	const [projects, setProjects] = useState([]);
	const [publications, setPublications] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getAllProjects = useCallback(async () => {
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

	const createProject = async (payload) => {
		try {
			setLoading(true);
			setError("");
			const token = await getToken();

			if (!token) {
				throw new Error("Missing Clerk token");
			}

			const data = await addNewProject(payload, token);
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

	const onDeleteProject = async (projecId) => {
		try {
			setLoading(true);
			setError("");

			const data = await deleteProject(projecId);
			console.log("In context deleteProject result: ", data);
			setProjects((prev) =>
				prev.filter((p) => Number(p.id) !== Number(projecId)),
			);
			return data;
		} catch (err) {
			setError(err.message || "Failed to fetch publications");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const onFetchPublication = async (orcidId) => {
		try {
			setLoading(true);
			setError("");

			const data = await fetchPublications(orcidId);
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
			console.log("savePublications in the provider :", payload);
			const data = await postPublications(projectId, payload);
			return data;
		} catch (err) {
			setError(err.message || "Failed to save publications");
		} finally {
			setLoading(false);
		}
	};

	const onUpdateProject = async (projectId, payload) => {
		try {
			setError("");
			setLoading(true);
			console.log("update project in the provider :", payload);
			const data = await updateProject(projectId, payload);
			getAllProjects(user_id);
			setProjects((prev) =>
				prev.map((project) =>
					Number(project.id) === Number(projectId) ? data : project,
				),
			);

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
		projects,
		publications,
		loading,
		error,
		onDeleteProject,
		setError,
		getAllProjects,
		createProject,
		postPublications,
		onFetchPublication,
		onUpdateProject,
		savePublications,
		setPublications,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
