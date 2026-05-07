import { useAuth } from "@clerk/react-router";
import { createContext, useCallback, useEffect, useState } from "react";
import {
	addNewProject,
	deleteProject,
	fetchAllProjects,
	updateProject,
} from "../apis/projectApi.ts";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const { getToken, isSignedIn, isLoaded } = useAuth();

	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getAllProjects = useCallback(async () => {
		try {
			setLoading(true);
			setError("");
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
			const token = await getToken();

			const data = await deleteProject(projecId, token);
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

	const onUpdateProject = async (projectId, payload) => {
		try {
			setError("");
			setLoading(true);
			console.log("update project in the provider :", payload);

			const token = await getToken();

			const data = await updateProject(projectId, payload, token);
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
		loading,
		error,
		onDeleteProject,
		setError,
		getAllProjects,
		createProject,
		onUpdateProject,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
