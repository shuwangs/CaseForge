import { useAuth } from "@clerk/react-router";
import { createContext, useCallback, useEffect, useState } from "react";
import {
	addNewProject,
	deleteProject,
	fetchAllProjects,
	fetchProjectStatus,
	updateProject,
} from "../apis/projectApi.ts";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
	const { getToken, isSignedIn, isLoaded } = useAuth();

	const [projects, setProjects] = useState([]);
	const [projectStatus, setProjectStatus] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getAllProjects = useCallback(async () => {
		try {
			setLoading(true);
			setError("");
			const token = await getToken();

			const data = await fetchAllProjects(token);
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
			setProjects((prev) => [...prev, data]);

			await fetchAllProjects(token);
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

			const token = await getToken();

			const data = await updateProject(projectId, payload, token);
			await getAllProjects();
			return data;
		} catch (err) {
			setError(err.message || "Failed to save publications");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const getProjectStatus = useCallback(
		async (projectId) => {
			try {
				setLoading(true);
				setError("");
				const token = await getToken();

				const data = await fetchProjectStatus(projectId, token);
				setProjectStatus(data);
				return data;
			} catch (err) {
				setError(err.message || "Failed to fetch projects");
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[getToken],
	);

	useEffect(() => {
		if (!isLoaded || !isSignedIn) return;

		getAllProjects();
	}, [isLoaded, isSignedIn, getAllProjects]);

	const values = {
		projects,
		loading,
		error,
		projectStatus,
		onDeleteProject,
		setError,
		getAllProjects,
		createProject,
		getProjectStatus,
		onUpdateProject,
	};

	return (
		<ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
	);
};
