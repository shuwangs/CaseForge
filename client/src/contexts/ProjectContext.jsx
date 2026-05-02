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
	const user_id = 1;
	const [projects, setProjects] = useState([]);
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

	const onUpdateProject = async (projectId, payload) => {
		try {
			setError("");
			setLoading(true);
			console.log("update project in the provider :", payload);
			const data = await updateProject(projectId, payload);

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
		getAllProjects(user_id);
	}, [getAllProjects]); // Later add user_id into it when user_id is not a constant

	const values = {
		user_id,
		projects,
		publications,
		loading,
		error,
		onDeleteProject,
		setError,
		getAllProjects,
		createProject,
		setPubulications,
		onFetchPublication,
		onUpdateProject,
		savePublications,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
