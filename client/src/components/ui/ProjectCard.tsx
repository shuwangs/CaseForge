import type { Project } from "../../types/project.ts";

interface ProjectCardProps {

    project: Project,
    onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    return (
        <div
            className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-primary)]
            shadow-md p-5 hover:shadow-md "
            key={project.id}
            onClick={onClick}
        >

            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
                {project.projectName || "No Name Specified"}
            </h2>

            {/* Applicant */}
            <p className="text-sm text-gray-600 mt-1">
                {project.firstName} {project.lastName}
            </p>

            {/* ORCID */}
            <p className="text-sm text-gray-500 mt-1">
                ORCID: {project.orcid}
            </p>

            {/* Date */}
            <p className="text-xs text-gray-400 mt-2">
                Created:{" "}
                {project.createdAt
                    ? new Date(project.createdAt).toLocaleDateString()
                    : "—"}
            </p>
        </div>
    )
}

export default ProjectCard;