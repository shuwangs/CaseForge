import { RiDeleteBinFill, RiEdit2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
// import DeleteBtn from "../ui/DeleteBtn.tsx";
import useProject from "../../contexts/useProject.js";
import type { Project } from "../../types/project.js";
import DeleteBtn from "../ui/DeleteBtn.js";
import EditBtn from "../ui/EditBtn.tsx";
import ProjectHeader from "../ui/ProjectHeader.tsx";

type ProjectOverviewProps = {
	project: Project;
};

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
	const navigate = useNavigate();
	const { projects, onDeleteProject } = useProject();

	const handleDelete = async () => {
		await onDeleteProject(project.id);
		navigate(`/projects/`);
	};

	return (
		<section className="flex rounded-xl border border-gray-100 bg-[var(--color-surface)] p-6 shadow-sm">
			<div className="flex-1">
				<h2 className="text-lg font-semibold text-[var(--color-primary)]">
					Project Information
				</h2>

				<div className="mt-5 grid grid-cols-2 gap-5 text-sm">
					<ProjectHeader
						title="Applicant"
						description={`${project.firstName} ${project.lastName}`}
					/>
					<ProjectHeader title="ORCID" description={project.orcid || "—"} />

					<ProjectHeader
						title="Research Area"
						description={project.researchArea || "—"}
					/>

					<ProjectHeader
						title="Institution / Organization"
						description={project.institution || "Not specified"}
					/>

					<ProjectHeader
						title="Petition Type"
						description={project.target || "—"}
					/>

					<ProjectHeader
						title="Created"
						description={
							project.createdAt
								? new Date(project.createdAt).toLocaleDateString()
								: "—"
						}
					/>
				</div>
			</div>
			<div className="ml-8 flex flex-col items-end gap-3">
				<Link to={`/projects/${project.id}/edit`}>
					<EditBtn type="button">
						<RiEdit2Line size={16} />
					</EditBtn>
				</Link>

				<DeleteBtn type="button" onClick={handleDelete}>
					<RiDeleteBinFill />
				</DeleteBtn>
			</div>
		</section>
	);
};

export default ProjectOverview;
