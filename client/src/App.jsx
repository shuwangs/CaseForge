import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import NewAnalysisPage from "./pages/NewAnalysisPage.jsx";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/new-analysis" element={<NewAnalysisPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
