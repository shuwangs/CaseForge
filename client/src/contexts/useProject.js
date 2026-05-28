import { useContext } from "react";
// import { ProjectContext } from "./ProjectContext.jsx";
import { ProjectGraphQLContext } from "./ProjectContextGraphQL.tsx";

const useProject = (shouldUseGraphQL = true) => {
	const gqlContext = useContext(ProjectGraphQLContext);
	// const restContext = useContext(ProjectContext);
	// const context = shouldUseGraphQL ? gqlContext : restContext;
	const context = gqlContext;
	if (!context) {
		throw new Error(
			shouldUseGraphQL
				? "useProject must be used within a ProjectGraphQLProvider"
				: "useProject must be used within a ProjectProvider",
		);
	}
	return context;
};

export default useProject;
