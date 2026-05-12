import { Link, NavLink, useParams } from "react-router-dom";

const AppSidebar = () => {
	const { projectId } = useParams();

	return (
		<aside>
			<nav>
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