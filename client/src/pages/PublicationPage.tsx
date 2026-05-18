import { useParams } from "react-router-dom";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import BaseBtn from "../components/ui/BaseBtn.js";
import PageDescription from "../components/ui/PageDescription.js";
import PageTitle from "../components/ui/PageTitle.js";
import usePublication from "../contexts/usePublication.ts";

const PublicationPage = () => {
	const { projectId } = useParams();

	const { publications } = usePublication();
	return (
		<section>
			<div className="flex">
				<div>
					<PageTitle>Publications</PageTitle>
					<PageDescription>
						Mananage and review publications imported from ORCID, add missing
						records and prepare your publication list before fetching citation
						data
					</PageDescription>
				</div>
				<div>
					<div>
						<BaseBtn>Refresh from ORCID</BaseBtn>
						<BaseBtn variant="secondary">FetchCitation</BaseBtn>
					</div>
					<div>
						<BaseBtn variant="ghost">Download</BaseBtn>
						<BaseBtn variant="ghost">Upload</BaseBtn>
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
