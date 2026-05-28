import { GoBook, GoBriefcase, GoGraph, GoPlusCircle } from "react-icons/go";
import { NavLink, useParams } from "react-router-dom";
import CitationStatusBanner from "../components/dashboard/CitationStatusBanner.tsx";

const AppSidebar = () => {
	const { projectId } = useParams();

	const baseLink =
		"flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-primary)] transition hover:bg-blue-50 hover:text-[var(--color-accent)]";
	const activeLink =
		" bg-blue-50 text-[var(--color-accent)] font-semibold border-[var(--color-accent)]";

	return (
		<aside className="min-h-[calc(100vh-73px)] w-60 shrink-0 border-r border-gray-200 bg-[var(--color-surface)] px-4 py-6">
			<nav className="flex flex-col gap-2">
				<NavLink
					to="/projects"
					end
					className={({ isActive }) =>
						`${baseLink} ${isActive ? activeLink : ""}`
					}
				>
					<span>
						<GoBriefcase className="h-4 w-4" />
					</span>
					Projects
				</NavLink>

				<NavLink
					to="/projects/new"
					end
					className={({ isActive }) =>
						`${baseLink} ${isActive ? activeLink : ""}`
					}
				>
					<span>
						<GoPlusCircle className="h-4 w-4" />
					</span>
					New Analysis
				</NavLink>

				{projectId && (
					<NavLink
						to={`/projects/${projectId}/publication`}
						end
						className={({ isActive }) =>
							`${baseLink} ${isActive ? activeLink : ""}`
						}
					>
						<span>
							<GoBook className="h-4 w-4" />
						</span>
						Publication
					</NavLink>
				)}

				{projectId && (
					<NavLink
						to={`/projects/${projectId}/dashboard`}
						end
						className={({ isActive }) =>
							`${baseLink} ${isActive ? activeLink : ""}`
						}
					>
						<span>
							<GoGraph className="h-4 w-4" />
						</span>
						Results
					</NavLink>
				)}
			</nav>

			<CitationStatusBanner />
		</aside>
	);
};

export default AppSidebar;
