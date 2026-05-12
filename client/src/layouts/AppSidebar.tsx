import { Link, NavLink, useParams } from "react-router-dom";

const AppSidebar = () => {
	const { projectId } = useParams();

	return (
		<aside className="min-h-[calc(100vh-73px)] w-64 shrink-0 border-r border-gray-200 bg-[var(--color-surface)] px-4 py-6">
			<nav className="flex flex-col gap-2">
				<Link to="/projects">
					Projects
				</Link>
				<Link to="/projects/new">
					New Analysis
				</Link>


				{projectId && (
					<NavLink to={`/projects/${projectId}/dashboard`}>
						Results
					</NavLink>
				)}
			</nav>

		</aside>
	);
};

export default AppSidebar;