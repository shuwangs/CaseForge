import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectOverview from "../components/project/ProjectOverview.tsx";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import DeleteBtn from "../components/ui/DeleteBtn.tsx";
import useCitation from "../contexts/useCitation.ts";
import useProject from "../contexts/useProject";
import usePublication from "../contexts/usePublication.ts";

const ProjectDetailPage = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const { projects, onDeleteProject } = useProject();

	const { publications, onFetchPublication, loadProjectPublications } =
		usePublication();
	const { handleFetchCitations } = useCitation();

	const project = projects.find(
		(item) => Number(item.id) === Number(projectId),
	);
	const hasPublication = publications.length > 0;

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
	}, [projectId]);

	if (!project) {
		return (
			<div className="mx-auto max-w-5xl px-6 py-8">
				<p className="text-gray-500">Loading project...</p>
			</div>
		);
	}
	return (
		<div className="mx-auto max-w-5xl px-6 py-8 space-y-6">
			<div>
				<button
					type="button"
					onClick={() => navigate("/projects")}
					className="mb-4 cursor-pointer text-sm text-gray-500 hover:text-[var(--color-primary)]"
				>
					← Back to Projects
				</button>

				<h1 className="text-2xl font-semibold text-[var(--color-primary)]">
					{project.projectName || "Untitled Project"}
				</h1>

				<p className="mt-1 text-sm text-gray-500">
					Review project details before fetching publications.
				</p>
			</div>

			<section>
				<ProjectOverview project={project} />
			</section>

			<section className="rounded-xl border border-[var(--color-primary)] bg-[var(--color-surface)] p-6 shadow-sm">
				<h2 className="text-lg font-semibold text-[var(--color-primary)]">
					Next Step
				</h2>

				<p className="mt-2 text-sm text-gray-500">
					Fetch publications using the ORCID saved in this project.
				</p>

				{!hasPublication ? (
					<div className="mt-5 flex gap-3">
						<Link to={`/projects/${project.id}/edit`}>
							<button type="button">Edit Project</button>
						</Link>

						{/* <DeleteBtn onClick={handleDelete}>Delete Project</DeleteBtn> */}

						<button type="button" onClick={handleSubmit}>
							Fetch Publications
						</button>
					</div>
				) : (
					<div>
						<p className="mt-2 text-sm text-gray-500">
							{publications.length} publications saved
						</p>

						<div className="mt-4 flex gap-3">
							<button type="button">Manage Publications</button>
						</div>
					</div>
				)}
			</section>

			<section>
				<div className="flex flex-col items-center">
					{publications.length > 0 && (
						<PublicationsGrid
							projectId={projectId}
							publications={publications}
						/>
					)}
				</div>

				{publications.length > 0 && (
					<div>
						<button
							className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
							type="button"
							onClick={() => handleFetchCitations(projectId)}
						>
							Fetch Citations
						</button>

						<Link to="/projects">
							<button type="button">Back</button>
						</Link>
					</div>
				)}
			</section>
		</div>
	);
};

export default ProjectDetailPage;
