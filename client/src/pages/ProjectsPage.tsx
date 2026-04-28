import useProject from "../contexts/useProject.js";
import type { Project } from "../types/project.js";

const ProjectsPage = () => {
	const { projects } = useProject();

	return (
		<div>
			<div>
				<h1>Projects</h1>
				<p>Manage your citation analysis projects</p>
			</div>
			{projects.length === 0 ? (
				<div>
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
							<h2>{project.projectName}</h2>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ProjectsPage;
