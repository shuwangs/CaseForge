import { IoArrowBack } from "react-icons/io5";
import OrcidInput from "../components/OrcidInput.jsx";
import useProject from "../hooks/useProject.js";
import PublicationsGrid from "../components/TableGrids/PublicationsGrid.jsx";

const NewAnalysisPage = () => {
	const { publications } = useProject();
	return (
		<div className="flex flex-col items-center">
			<div className="flex ">
				<IoArrowBack /> <span>Back to Projects</span>
			</div>
			<OrcidInput />

			{publications.length > 0 && <PublicationsGrid publications={publications} />}

		</div>


	);
};

export default NewAnalysisPage;
