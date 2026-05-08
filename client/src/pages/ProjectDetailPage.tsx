import { Link, useNavigate, useParams } from "react-router-dom";
import PublicationsGrid from "../components/project/PublicationsGrid.jsx";
import DeleteBtn from "../components/ui/DeleteBtn.tsx";
import useProject from "../contexts/useProject";
import usePublication from "../contexts/usePublication.ts";
import useCitation from "../contexts/useCitation.ts";

const ProjectDetailPage = () => {
	const { projectId } = useParams();
	const navigate = useNavigate();
	const { projects, onDeleteProject } = useProject();
	const { publications, onFetchPublication } = usePublication();
	const { handleFetchCitations } = useCitation();

	const project = projects.find(
		(item) => Number(item.id) === Number(projectId),
	);
	const hasPublication = publications.length > 0;

	const handleSubmit = async () => {
		await onFetchPublication(project.orcid);
		navigate(`/projects/${projectId}`);
	};

	const handleDelete = async () => {
		await onDeleteProject(project.id);
		navigate(`/projects/`);
	};

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

			<section className="rounded-xl border border-gray-100 bg-[var(--color-surface)] p-6 shadow-sm">
				<h2 className="text-lg font-semibold text-[var(--color-primary)]">
					Project Information
				</h2>

				<div className="mt-5 grid grid-cols-2 gap-5 text-sm">
					<div>
						<p className="text-gray-400">Applicant</p>
						<p className="font-medium text-[var(--color-primary)]">
							{project.firstName} {project.lastName}
						</p>
					</div>

					<div>
						<p className="text-gray-400">ORCID</p>
						<p className="font-medium text-[var(--color-primary)]">
							{project.orcid || "—"}
						</p>
					</div>

					<div>
						<p className="text-gray-400">Research Area</p>
						<p className="font-medium text-[var(--color-primary)]">
							{project.researchArea || "—"}
						</p>
					</div>
					<div>
						<p className="text-gray-400">Institution /Organization</p>
						<p className="font-medium text-[var(--color-primary)]">
							{project.institution || "Not specified"}
						</p>
					</div>
					<div>
						<p className="text-gray-400">Petition Type</p>
						<p className="font-medium text-[var(--color-primary)]">
							{project.target || "—"}
						</p>
					</div>

					<div>
						<p className="text-gray-400">Created</p>
						<p className="font-medium text-[var(--color-primary)]">
							{project.createdAt
								? new Date(project.createdAt).toLocaleDateString()
								: "—"}
						</p>
					</div>
				</div>
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

						<DeleteBtn onClick={handleDelete}>Delete Project</DeleteBtn>

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
							<button type="button" onClick={() => handleFetchCitations(project.id)}>
								Fetch Citations
							</button>
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
			</section>

		</div>
	);
};

export default ProjectDetailPage;
