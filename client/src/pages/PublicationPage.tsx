import { Link, useNavigate, useParams } from "react-router-dom";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import usePublication from "../contexts/usePublication.ts";

const PublicationPage = () => {
	const { projectId } = useParams();

	const { publications } = usePublication();
	return (
		<div className="flex flex-col items-center">
			{publications.length > 0 && (
				<PublicationsGrid projectId={projectId} publications={publications} />
			)}
		</div>
	);
};

export default PublicationPage;
