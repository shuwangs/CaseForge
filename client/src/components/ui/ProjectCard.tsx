import { Link } from "react-router-dom";
import type { Project } from "../../types/project.ts";

interface ProjectCardProps {
	project: Project;
	href: string;
}

const ProjectCard = ({ project, href }: ProjectCardProps) => {
	return (
		<Link to={href}>
			<div
				className="border border-gray-200 shadow-sm hover:border-[var(--color-accent)] hover:shadow-md"
			>
				<h2 className="text-lg font-semibold text-[var(--color-primary)]">
					{project.projectName || "No Name Specified"}
				</h2>

				{/* Applicant */}
				<p className="text-sm text-gray-600 mt-1">
					{project.firstName} {project.lastName}
				</p>

				{/* ORCID */}
				<p className="text-sm text-gray-500 mt-1">ORCID: {project.orcid}</p>

				{/* Date */}
				<p className="text-xs text-gray-400 mt-2">
					Created:{" "}
					{project.createdAt
						? new Date(project.createdAt).toLocaleDateString()
						: "—"}
				</p>
			</div>
		</Link>
	);
};

export default ProjectCard;
