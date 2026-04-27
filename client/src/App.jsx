import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectProvider.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import NewAnalysisPage from "./pages/NewAnalysisPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";

const App = () => {
	return (
		<BrowserRouter>
			<ProjectProvider>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/new-analysis" element={<NewAnalysisPage />} />
					<Route path="/projects" element={<ProjectsPage />} />
				</Routes>
			</ProjectProvider>
		</BrowserRouter>
	);
};

export default App;
