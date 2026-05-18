import { Link, useNavigate, useParams } from "react-router-dom";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import usePublication from "../contexts/usePublication.ts";
import PageTitle from "../components/ui/PageTitle.js";
import PageDescription from "../components/ui/PageDescription.js";

const PublicationPage = () => {
	const { projectId } = useParams();

	const { publications } = usePublication();
	return (
		<section>
			<div className="flex">
				<div>
					<PageTitle >Publications</PageTitle>
					<PageDescription>Mananage and review publications imported from ORCID,
						add missing records and prepare your publication list before fetching citation data
					</PageDescription>

				</div>
				<div>
					<div>
						<button>Refresh from ORCID</button>
						<button>FetchCitation</button>

					</div>
					<div>
						<button>Download</button>
						<button>Upload</button>

					</div>

				</div>

			</div>
			<div className="flex flex-col items-center">
				{publications.length > 0 && (
					<PublicationsGrid projectId={projectId} publications={publications} />
				)}
			</div>
		</section>

	);
};

export default PublicationPage;
