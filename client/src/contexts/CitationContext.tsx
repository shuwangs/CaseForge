import { useAuth } from "@clerk/react-router";
import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import { getCitations, fetchCitationCount, fetchCitationYearlyCounts, fetchCitationMapData, fetchCitationStatus } from "../apis/citationApi.ts";

export const CitationContext = createContext();

export const CitationProvider = ({ children }) => {
	const navigate = useNavigate();
	const { getToken, _isSignedIn, _isLoaded } = useAuth();
	const [citationStatus, setCitationStatus] = useState(null);
	const [isPolling, setIsPolling] = useState(false);
	const [citationCount, setCitationCount] = useState(null);
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

	const getCitationTable = async (projectId) => {
		console.log("fetchCitation")
		setLoading(true);
		setError("");
		try {
			const token = await getToken();
			const result = await fetchCitationCount(projectId, token);
			setCitationCount(result);
			console.log("citation context, citation counts: ", citationCount)
		} catch (err) {
			setError(err.message)
		}
	}

	const getCitationYearlyCounts = async (projectId) => {
		console.log("getCitationYearlyCounts")
		setLoading(true);
		setError("");
		try {
			const token = await getToken();
			const result = await fetchCitationYearlyCounts(projectId, token);
			setCitationYearlyCount(result);
			console.log("citation context, citationYearlyCount: ", citationYearlyCount)

		} catch (err) {
			setError(err.message)
		}
	}
	const getCitationMapData = async (projectId) => {
		console.log("getCitationMapData")
		setLoading(true);
		setError("");
		try {
			const token = await getToken();
			const result = await fetchCitationMapData(projectId, token);
			setCitationMap(result);

			console.log("citation context, citationMap: ", citationMap)

		} catch (err) {
			setError(err.message)
		}
	}

	const startPollingCitationStatus = async (projectId) => {

		setIsPolling(true);
		const citationIntervalId = setInterval(() => {

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
					await getCitationTable(projectId);
					await getCitationYearlyCounts(projectId);
					await getCitationMapData(projectId);
				}

			} catch (err) {
				console.error(error);
				clearInterval(citationIntervalId);
				setIsPolling(false);
				setError(err.message);

			}
		}, 2000)

	}

	const values = {
		citationCount,
		citationMap,
		citationYearlyCount,
		citationStatus,
		error,
		isPolling,
		loading,

		handleFetchCitations,
		startPollingCitationStatus
	};
	return (
		<CitationContext.Provider value={values}>
			{children}
		</CitationContext.Provider>
	);
};
