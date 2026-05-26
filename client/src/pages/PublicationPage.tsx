import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import BaseBtn from "../components/ui/BaseBtn.js";
import PageDescription from "../components/ui/PageDescription.js";
import PageTitle from "../components/ui/PageTitle.js";
import usePublication from "../contexts/usePublication.ts";

const PublicationPage = () => {
	const { projectId } = useParams();
	const { publications, loading, error, loadProjectPublications } =
		usePublication();

	useEffect(() => {
		if (!projectId) return;

		loadProjectPublications(projectId);
	}, [projectId, loadProjectPublications]);

	if (loading) {
		return <p>Loading publications...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}
	return (
		<section className="px-8 py-8">
			<div className="flex justify-between items-start gap-6 mb-8">
				<div>
					<PageTitle>Publications</PageTitle>
					<PageDescription>
						Mananage and review publications imported from ORCID, add missing
						records and prepare your publication list before fetching citation
						data
					</PageDescription>
				</div>
				<div className="flex flex-col items-end gap-3">
					<div className="flex gap-3">
						<BaseBtn onClick={() => console.log("refresh ORCID")}>
							Refresh from ORCID
						</BaseBtn>
						<BaseBtn
							variant="secondary"
							onClick={() => console.log("fetch citation")}
						>
							FetchCitation
						</BaseBtn>
					</div>
					<div className="flex gap-3">
						<BaseBtn variant="ghost" onClick={() => console.log("download")}>
							Download
						</BaseBtn>
						<BaseBtn variant="ghost" onClick={() => console.log("upload")}>
							Upload
						</BaseBtn>
					</div>
				</div>
			</div>
			<div className="mt-b">
				{publications.length > 0 && (
					<PublicationsGrid projectId={projectId} publications={publications} />
				)}
			</div>
		</section>
	);
};

export default PublicationPage;
