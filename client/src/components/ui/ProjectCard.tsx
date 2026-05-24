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
				className="rounded-lg border border-gray-200 shadow-sm 
			px-6 py-2 bg-white
			hover:border-[var(--color-accent)] hover:shadow-md mt-2"
			>
				<div className="flex items-start justify-between gap-6">
					{/* Left side */}
					<div>
						<h2 className="text-md font-semibold text-[var(--color-primary)]">
							{project.projectName || "No Name Specified"}
						</h2>

						{/* Applicant */}
						<p className="text-xs text-gray-600 mt-1">
							{`Name: ${project.firstName} ${project.lastName}`}
						</p>

						{/* ORCID */}
						<p className="text-xs text-gray-500 mt-1">ORCID: {project.orcid}</p>
					</div>

					{/* Right side */}

					<div className="flex flex-col text-right  justify-between">
						<p className="text-xs uppercase tracking-wide text-gray-400">
							Created
						</p>

						<p className="mt-1 text-xs text-gray-500">
							{project.createdAt
								? new Date(project.createdAt).toLocaleDateString()
								: "—"}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
