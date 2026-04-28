import { IoArrowBack } from "react-icons/io5";
import OrcidInput from "../components/project/OrcidInput.jsx";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import useProject from "../contexts/useProject.js";

const NewAnalysisPage = () => {
	const { projectId, publications } = useProject();
	return (
		<div className="flex flex-col items-center">
			<div className="flex ">
				<IoArrowBack /> <span>Back to Projects</span>
			</div>
			<OrcidInput />

			{publications.length > 0 && (
				<PublicationsGrid projectId={projectId} publications={publications} />
			)}
		</div>
	);
};

export default NewAnalysisPage;
