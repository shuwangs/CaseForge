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
			afterSignOutUrl="/"

			appearance={{
				variables: {
					colorPrimaryForeground: "#025f67", // used for text on the primary background.
					colorBackground: "#2f9d94",   //The background color for the card container
					colorMuted: "#2f9d94",  //used for muted backgrounds
					colorInputForeground: "#025f67",  //The color used for text in input fields.
					colorInput: "#f7f6f2",   //The background color used for input fields.
					colorPrimary: "#f7f6f2",
					colorShimmer: "#f7f6f2",  // color of the avatar shimmer.
					colorRing: "#025f67", //lor of the ring when an interactive element is focused.
					fontFamily: '"IBM Plex Sans", system-ui, sans-serif',

					borderRadius: "0.5rem",
					colorText: "#f7f6f2",
					colorTextSecondary: "#025f67",
				},
			}}
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
