import { useContext } from "react";
import { CitationContext } from "./CitationContext.js";

const useCitation = () => {
    const context = useContext(CitationContext);

    if (!context) {
        throw new Error("useCitation must be used within a ProjectProvider");

    }

    return context;
}

export default useCitation;
