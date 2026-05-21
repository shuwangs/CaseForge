import { useAuth } from "@clerk/react-router";
import { createContext, useState } from "react";
import {
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

	const values = {
		error,
		loading,
		journalTableSummary,
		mapSummary,
		trendSummary,
		handleGenerateJournalTableSummary,
		handleGenerateMapSummary,
		handleGenerateTrendSummary,
	};

	return (
		<SummaryContext.Provider value={values}>{children}</SummaryContext.Provider>
	);
};
