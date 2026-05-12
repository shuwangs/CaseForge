import { Link, NavLink, useParams } from "react-router-dom";

const AppSidebar = () => {
	const { projectId } = useParams();

	const baseLink =
		"block rounded-md px-4 py-2 text-md font-medium text-[var(--color-primary)] hover:bg-[var(--color-bg)] hover:text-[var(--color-accent)]";
	const activeLink =
		"bg-[var(--color-bg)] text-[var(--color-accent)] border-l-4 border-[var(--color-accent)]";

	return (
		<aside className="min-h-[calc(100vh-73px)] w-64 shrink-0 border-r border-gray-200 bg-[var(--color-surface)] px-4 py-6">
			<nav className="flex flex-col gap-2">
				<Link to="/projects" className={baseLink}>
					Projects
				</Link>

				<Link to="/projects/new" className={baseLink}>
					New Analysis
				</Link>

				{projectId && (
					<NavLink
						to={`/projects/${projectId}/dashboard`}
						className={({ isActive }) =>
							`${baseLink} ${isActive ? activeLink : ""}`
						}
					>
						Results
					</NavLink>
				)}
			</nav>
		</aside>
	);
};

export default AppSidebar;
