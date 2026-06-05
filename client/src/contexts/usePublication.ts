import { useContext } from "react";
import { PublicationContext } from "./PublicationContext.tsx";

const usePublication = () => {
	const context = useContext(PublicationContext);
	if (!context) {
		throw new Error("usePublication must be used within a PublicationProvider");
	}
	return context;
};

export default usePublication;
