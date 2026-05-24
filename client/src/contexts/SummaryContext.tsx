import { useAuth } from "@clerk/react-router";
import { createContext, useCallback, useState } from "react";
import {
	fetchProjectSummary,
	generateJournalTableSummary,
	generateMapSummary,
	generateTrendSummary,
} from "../apis/summaryApi.js";

export const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
	const { getToken } = useAuth();
	const [journalTableSummary, setJournalTableSummary] = useState("");
	const [mapSummary, setMapSummary] = useState("");
	const [trendSummary, setTrendSummary] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleGenerateJournalTableSummary = async (projectId) => {
		try {
			setLoading(true);
			setError("");

			const token = await getToken();

			if (!token) {
				throw new Error("Missing auth token");
			}

			const result = await generateJournalTableSummary(projectId, token);
			setJournalTableSummary(result.summary);
			return result;
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to generate map summary",
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};
	const handleGenerateTrendSummary = async (projectId) => {
		try {
			setLoading(true);
			setError("");

			const token = await getToken();

			if (!token) {
				throw new Error("Missing auth token");
			}

			const result = await generateTrendSummary(projectId, token);
			setTrendSummary(result.summary);
			return result;
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to generate trend summary",
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const handleGenerateMapSummary = async (projectId) => {
		try {
			setLoading(true);
			setError("");

			const token = await getToken();

			if (!token) {
				throw new Error("Missing auth token");
			}

			const result = await generateMapSummary(projectId, token);
			setMapSummary(result.summary);
			return result;
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to generate map summary",
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const loadProjectSummary = useCallback(async (projectId) => {
		try {
			setLoading(true);
			setError("");

			const token = await getToken();

			if (!token) {
				throw new Error("Missing auth token");
			}
			const result = await fetchProjectSummary(projectId, token);
			setJournalTableSummary(result?.ai_overview || "");
			setTrendSummary(result?.ai_trend || "");
			setMapSummary(result?.ai_geographic || "");
			return result;
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "Failed to load summary",
			);
			throw error;
		} finally {
			setLoading(false);
		}
	}, [getToken]);

	const values = {
		error,
		loading,
		journalTableSummary,
		mapSummary,
		trendSummary,
		handleGenerateJournalTableSummary,
		handleGenerateMapSummary,
		handleGenerateTrendSummary,
		loadProjectSummary,
	};

	return (
		<SummaryContext.Provider value={values}>{children}</SummaryContext.Provider>
	);
};
