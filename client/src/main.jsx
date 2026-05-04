import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const ClerkWithRouter = () => {
	const navigate = useNavigate();

	return (
		<ClerkProvider
			publishableKey={PUBLISHABLE_KEY}
			routerPush={(to) => navigate(to)}
			routerReplace={(to) => navigate(to, { replace: true })}
			signInUrl="/sign-in"
			signUpUrl="/sign-up"
			signInFallbackRedirectUrl="/"
			signUpFallbackRedirectUrl="/"
			signUpForceRedirectUrl="/projects"
			signInForceRedirectUrl="/projects"
		>
			<App />
		</ClerkProvider>
	);
};
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<ClerkWithRouter />
		</BrowserRouter>
	</StrictMode>,
);
