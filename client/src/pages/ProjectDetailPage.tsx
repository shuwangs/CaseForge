import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectOverview from "../components/project/ProjectOverview.tsx";
import ProjectProgress from "../components/project/ProjectProgress.tsx";
import BaseBtn from "../components/ui/BaseBtn.js";
import PageDescription from "../components/ui/PageDescription.js";
import PageTitle from "../components/ui/PageTitle.js";
import ProjectDetailHeader from "../components/ui/ProjectDetailHeader.tsx";
import useCitation from "../contexts/useCitation.ts";
import useProject from "../contexts/useProject";
import usePublication from "../contexts/usePublication.ts";

const ProjectDetailPage = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const { projects } = useProject();

	const { publications, onFetchPublication, loadProjectPublications } =
		usePublication();
	const { handleFetchCitations } = useCitation();

	const project = projects.find(
		(item) => Number(item.id) === Number(projectId),
	);
	const hasPublications = publications.length > 0;
	const hasCitations = false;
	const stage = !hasPublications
		? "NEEDS_PUBLICATIONS"
		: !hasCitations
			? "NEEDS_CITATIONS"
			: "READY";

	const handleSubmit = async () => {
		console.log("clicked fetch publications");
		console.log("project:", project);
		console.log("projectId:", projectId);

		if (!project?.orcid) return;

		await onFetchPublication(project.orcid, projectId);
		navigate(`/projects/${projectId}`);
	};

	useEffect(() => {
		if (!projectId) return;
		loadProjectPublications(projectId);
	}, [projectId, loadProjectPublications]);

	if (!project) {
		return (
			<div className="mx-auto max-w-5xl px-6 py-8">
				<p className="text-gray-500">Loading project...</p>
			</div>
		);
	}
	return (
		<div className="mx-auto max-w-5xl px-6 space-y-4">
			<div>
				<button
					type="button"
					onClick={() => navigate("/projects")}
					className="mb-4 cursor-pointer text-xs text-gray-500 hover:text-[var(--color-primary)]"
				>
					← Back to Projects
				</button>

				<PageTitle>{project.projectName || "Untitled Project"}</PageTitle>

				<PageDescription>
					Review project details before fetching publications.
				</PageDescription>
			</div>

			<section>
				<ProjectOverview project={project} />
			</section>

			<ProjectProgress
				hasPublications={hasPublications}
				hasCitations={hasCitations}
			/>

			<section className="rounded-xl bg-[var(--color-surface)] px-6 py-4 shadow-sm">
				<ProjectDetailHeader>Next Step</ProjectDetailHeader>

				{stage === "NEEDS_PUBLICATIONS" && (
					<div className="mt-5 flex gap-3">
						<Link to={`/projects/${project.id}/edit`}>
							<BaseBtn variant="secondary">Edit Project</BaseBtn>
						</Link>

						{/* <DeleteBtn onClick={handleDelete}>Delete Project</DeleteBtn> */}

						<BaseBtn variant="secondary" onClick={handleSubmit}>
							Fetch Publications
						</BaseBtn>
					</div>
				)}

				{stage === "NEEDS_CITATIONS" && (
					<div className="mt-5 flex gap-3">
						<Link to={`/projects/${project.id}/edit`}>
							<BaseBtn variant="secondary" type="button">
								Edit Project
							</BaseBtn>
						</Link>

						<BaseBtn
							variant="secondary"
							onClick={() => handleFetchCitations(projectId)}
						>
							Fetch Citations
						</BaseBtn>
					</div>
				)}

				{stage === "READY" && (
					<div>
						<p className="mt-2 text-sm text-gray-500">
							Citation analysis is ready. View your dashboard.
						</p>

						<div className="mt-5">
							<BaseBtn variant="secondary">View Dashboard</BaseBtn>
						</div>
					</div>
				)}
			</section>
		</div>
	);
};

export default ProjectDetailPage;
