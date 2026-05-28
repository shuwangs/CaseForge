import { ClerkProvider } from "@clerk/react";
import { useAuth } from "@clerk/react-router";
import { ApolloProvider } from "@apollo/client";
import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { createApolloClient } from "./lib/apolloClient.ts";

import "./index.css";
import App from "./App.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const ApolloWithAuth = ({ children }) => {
	const { getToken } = useAuth();
	const client = useMemo(() => createApolloClient(getToken), [getToken]);
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

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
		>
			<ApolloWithAuth>
				<App />
			</ApolloWithAuth>
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
