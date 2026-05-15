import { useAuth } from "@clerk/react-router";
import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import {
	fetchCitationCount,
	fetchCitationMapData,
	fetchCitationStatus,
	fetchCitationYearlyCounts,
	getCitations,
} from "../apis/citationApi.ts";

export const CitationContext = createContext();

export const CitationProvider = ({ children }) => {
	const navigate = useNavigate();
	const { getToken, _isSignedIn, _isLoaded } = useAuth();
	const [citationStatus, setCitationStatus] = useState(null);
	const [isPolling, setIsPolling] = useState(false);
	const [citationCounts, setCitationCounts] = useState(null);
	const [citationYearlyCount, setCitationYearlyCount] = useState(null);
	const [citationMap, setCitationMap] = useState(null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleFetchCitations = async (projectId) => {
		try {
			setLoading(true);
			setError("");
			const token = await getToken();
			const result = await getCitations(projectId, token);
			console.log(result);

			startPollingCitationStatus(projectId);

			// navigate to dashboard
			navigate(`/projects/${projectId}/dashboard`);
		} catch (err) {
			setError(err.message);
			throw new Error("Fetch citations failed.");
		} finally {
			setLoading(false);
		}
	};

	const startPollingCitationStatus = async (projectId) => {
		setIsPolling(true);
		const citationIntervalId = setInterval(async () => {
			try {
				const token = await getToken();
				const result = await fetchCitationStatus(projectId, token);

				setCitationStatus(result.data);
				const { active, waiting, _fail } = result.data;

				const stillProcessing = active > 0 || waiting > 0;

				if (!stillProcessing) {
					clearInterval(citationIntervalId);
					setIsPolling(false);

					// jobs finished, refresh dashboard data

					await loadCitationResults(projectId);
				}
			} catch (err) {
				console.error(error);
				clearInterval(citationIntervalId);
				setIsPolling(false);
				setError(err.message);
			}
		}, 2000);
	};

	const loadCitationResults = useCallback(
		async (projectId) => {
			setLoading(true);
			setError("");

			try {
				const token = await getToken();

				const [tableData, yearlyData, mapData] = await Promise.all([
					fetchCitationCount(projectId, token),
					fetchCitationYearlyCounts(projectId, token),
					fetchCitationMapData(projectId, token),
				]);

				setCitationCounts(tableData);
				setCitationYearlyCount(yearlyData);
				setCitationMap(mapData);
			} catch (err) {
				setError(err.message);
				throw err;
			} finally {
				setLoading(false);
			}
		},
		[getToken],
	);

	const values = {
		citationCounts,
		citationMap,
		citationYearlyCount,
		citationStatus,
		error,
		isPolling,
		loading,
		handleFetchCitations,
		loadCitationResults,
		startPollingCitationStatus,
	};
	return (
		<CitationContext.Provider value={values}>
			{children}
		</CitationContext.Provider>
	);
};
