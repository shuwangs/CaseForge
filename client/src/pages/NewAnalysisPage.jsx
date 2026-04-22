import OrcidInput from "../components/OrcidInput.jsx";
import { IoArrowBack } from "react-icons/io5";

const NewAnalysisPage = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="flex ">
				<IoArrowBack /> <span>Back to Projects</span>
			</div>
			<OrcidInput />
		</div>
	);
};

export default NewAnalysisPage;
