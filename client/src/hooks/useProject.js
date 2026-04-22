import { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectProvider.jsx";

const useProject = () => {
	const context = useContext(ProjectContext);
	if (!context) {
		throw new Error("useProject must be used within a ProjectProvider");
	}
	return context;
};

export default useProject;
