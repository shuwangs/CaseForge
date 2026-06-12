import { MdCalendarToday, MdOutlineFolder } from "react-icons/md";
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
				className="max-w-4xl rounded-lg border border-gray-200 shadow-sm 
			px-6 py-4 bg-white
			hover:border-[var(--color-accent)] hover:shadow-md mt-2"
			>
				<div className="flex items-center gap-4">
					{/* Left side */}
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[var(--color-secondary)]">
						<MdOutlineFolder className="h-5 w-5" />
					</div>
					{/* Middle side */}
					<div className="min-w-0 flex-1">
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
					<div className=" shrink-0 flex text-right items-center gap-2">
						<div>
							<p className="flex text-xs uppercase tracking-wide text-gray-400 gap-1">
								<span>
									<MdCalendarToday className="text-[var(--color-secondary)]" />
								</span>
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
			</div>
		</Link>
	);
};

export default ProjectCard;
