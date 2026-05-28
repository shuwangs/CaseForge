import { useUser } from "@clerk/react";
import { Link } from "react-router-dom";
import BaseBtn from "../components/ui/BaseBtn.js";
import ProjectCard from "../components/ui/ProjectCard.tsx";
import useProject from "../contexts/useProject.js";
import type { Project } from "../types/project.js";

const ProjectsPage = () => {
	const { projects } = useProject();
	const { isSignedIn, _user, isLoaded } = useUser();

	if (!isLoaded) return <div>Loading...</div>;

	// Protect the page from unauthenticated users
	if (!isSignedIn) return <div>Sign in to view this page</div>;

	return (
		<div className="mx-auto max-w-5xl space-y-6 px-8">
			<div className="flex justify-between">
				<div>
					<h1 className="text-xl font-semibold text-[var(--color-primary)]">
						Projects
					</h1>

					<p className="text-sm text-gray-500 mt-1 text-[var(--color-accent)]">
						Manage your citation analysis projects
					</p>
				</div>

				<Link to="/projects/new">
					<BaseBtn>+ New Project</BaseBtn>
				</Link>
			</div>
			{projects.length === 0 ? (
				<div className="bg-[var(--color-surface)] rounded-xl shadow-sm p-10 text-center max-w-md mx-auto mt-10">
					<div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-bg)] text-2xl">
						📊
					</div>
					<h2>No projects yet</h2>
					<p>
						Create your first project to start retrieving and analyzing
						publications
					</p>
				</div>
			) : (
				<div>
					{projects.map((project: Project) => (
						<div key={project.id}>
							<ProjectCard
								project={project}
								key={project.id}
								href={`/projects/${project.id}`}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ProjectsPage;
