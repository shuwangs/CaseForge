import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext.jsx";
import AppLayout from "./layouts/AppLayout.js";
import LandingPage from "./pages/LandingPage.jsx";
import NewAnalysisPage from "./pages/NewAnalysisPage.jsx";
import NewProjectPage from "./pages/NewProjectPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";

const App = () => {
	return (
		<BrowserRouter>
			<ProjectProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} />

					<Route element={<AppLayout />}>
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/projects/new" element={<NewProjectPage />} />

						<Route path="/new-analysis" element={<NewAnalysisPage />} />
					</Route>
				</Routes>
			</ProjectProvider>
		</BrowserRouter>
	);
};

export default App;
