import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NewAnalysisPage from "./pages/NewAnalysisPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import AppLayout from "./layouts/AppLayout.js";
const App = () => {
	return (
		<BrowserRouter>
			<ProjectProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} />

					<Route element={<AppLayout />} >
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/new-analysis" element={<NewAnalysisPage />} />
					</Route>
				</Routes>
			</ProjectProvider>
		</BrowserRouter >
	);
};

export default App;
