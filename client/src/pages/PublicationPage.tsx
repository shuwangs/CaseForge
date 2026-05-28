import {
	CsvExportModule,
	type GridApi,
	type GridReadyEvent,
	ModuleRegistry,
} from "ag-grid-community";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import BaseBtn from "../components/ui/BaseBtn.js";
import PageDescription from "../components/ui/PageDescription.js";
import PageTitle from "../components/ui/PageTitle.js";
import useCitation from "../contexts/useCitation.js";
import useProject from "../contexts/useProject.js";
import usePublication from "../contexts/usePublication.ts";

ModuleRegistry.registerModules([CsvExportModule]);

const PublicationPage = () => {
	const { projectId } = useParams();
	const gridApiRef = useRef<GridApi | null>(null);
	const { projects } = useProject();

	const {
		publications,
		loading,
		error,
		loadProjectPublications,
		onFetchPublication,
	} = usePublication();
	const { handleFetchCitations } = useCitation();

	const project = projects.find((pr) => Number(pr.id) === Number(projectId));
	// For download the table
	function onGridReady(params: GridReadyEvent) {
		gridApiRef.current = params.api;
	}
	function onBtnExport() {
		if (gridApiRef.current) {
			gridApiRef.current.exportDataAsCsv({
				fileName: "publication_list.csv",
			});
		} else {
			console.warn("Agrid Api is not ready!");
		}
	}

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
		<section className="px-8">
			<div className="flex justify-between items-start gap-6 mb-4">
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
						<BaseBtn
							onClick={() => onFetchPublication(project.orcid, projectId)}
						>
							Refresh from ORCID
						</BaseBtn>
						<BaseBtn
							variant="secondary"
							onClick={() => handleFetchCitations(projectId)}
						>
							FetchCitation
						</BaseBtn>
					</div>
					<div className="flex gap-3">
						<BaseBtn variant="ghost" onClick={onBtnExport}>
							Download
						</BaseBtn>
						<Link to={`/projects/${projectId}`}>
							<BaseBtn variant="ghost">Back</BaseBtn>
						</Link>
					</div>
				</div>
			</div>
			<div className="mt-b">
				{publications.length > 0 && (
					<PublicationsGrid
						projectId={projectId}
						publications={publications}
						suppressExcelExport={true}
						onGridReady={onGridReady}
					/>
				)}
			</div>
		</section>
	);
};

export default PublicationPage;
