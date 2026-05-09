import { useAuth } from "@clerk/react-router";
import { createContext, useState } from "react";
import { getCitations } from "../apis/citationApi.ts";

export const CitationContext = createContext();

export const CitationProvider = ({ children }) => {
	const { getToken, _isSignedIn, _isLoaded } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleFetchCitations = async (projectId) => {
		try {
			setLoading(true);
			setError("");
			const token = await getToken();
			const result = await getCitations(projectId, token);
			console.log(result);
		} catch (err) {
			setError(err.message);
			throw new Error("Fetch citations failed.");
		} finally {
			setLoading(false);
		}
	};

	const values = {
		error,
		loading,
		handleFetchCitations,
	};
	return (
		<CitationContext.Provider value={values}>
			{children}
		</CitationContext.Provider>
	);
};
