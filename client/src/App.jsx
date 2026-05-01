import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext.jsx";
import AppLayout from "./layouts/AppLayout.js";
import EditProjectPage from "./pages/ EditProjectPage.tsx";
import LandingPage from "./pages/LandingPage.jsx";
import NewProjectPage from "./pages/NewProjectPage.tsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";

const App = () => {
	return (
		<BrowserRouter>
			<ProjectProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} />

					<Route element={<AppLayout />}>
						<Route path="/projects" element={<ProjectsPage />} />
						<Route
							path="/projects/:projectId"
							element={<ProjectDetailPage />}
						/>

						<Route path="/projects/new" element={<NewProjectPage />} />
						<Route
							path="/projects/:projectId/edit"
							element={<EditProjectPage />}
						/>
					</Route>
				</Routes>
			</ProjectProvider>
		</BrowserRouter>
	);
};

export default App;
