import { Route, Routes } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.js";
import LandingPage from "./pages/LandingPage.jsx";
import NewProjectPage from "./pages/NewProjectPage.tsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";


const App = () => {

	return (

		<ProjectProvider>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/sign-in/*" element={<SignInPage />} />
				<Route path="/sign-up/*" element={<SignUpPage />} />

				<Route element={<ProtectedLayout />}>
					<Route path="/projects" element={<ProjectsPage />} />
					<Route
						path="/projects/:projectId"
						element={<ProjectDetailPage />}
					/>

					<Route path="/projects/new" element={<NewProjectPage />} />
				</Route>
			</Routes>
		</ProjectProvider>

	);
};

export default App;
