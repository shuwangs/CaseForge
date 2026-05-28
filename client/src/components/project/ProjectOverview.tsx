import { RiDeleteBinFill, RiEdit2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useProject from "../../contexts/useProject.js";
import type { Project } from "../../types/project.js";
import BaseBtn from "../ui/BaseBtn.js";
import ProjectDetailHeader from "../ui/ProjectDetailHeader.tsx";
import ProjectHeader from "../ui/ProjectHeader.tsx";

type ProjectOverviewProps = {
	project: Project;
};

const ProjectOverview = ({ project }: ProjectOverviewProps) => {
	const navigate = useNavigate();
	const { onDeleteProject } = useProject();

	const handleDelete = async () => {
		await onDeleteProject(project.id);
		navigate(`/projects/`);
	};

	return (
		<section className="flex rounded-lg border border-gray-100 bg-[var(--color-surface)] px-6 py-4 shadow-sm">
			<div className="flex-1">
				<ProjectDetailHeader>Project Information</ProjectDetailHeader>

				<div className="mt-5 grid grid-cols-2 gap-3">
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
					<BaseBtn variant="secondary">
						<RiEdit2Line size={16} />
					</BaseBtn>
				</Link>

				<BaseBtn variant="danger" onClick={handleDelete}>
					<RiDeleteBinFill />
				</BaseBtn>
			</div>
		</section>
	);
};

export default ProjectOverview;
