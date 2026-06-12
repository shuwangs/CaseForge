import { Show } from "@clerk/react";
import { Navigate } from "react-router-dom";
import AppLayout from "./AppLayout.js";

const ProtectedLayout = () => {
	return (
		<>
			<Show when="signed-in">
				<AppLayout />
			</Show>
			<Show when="signed-out">
				<Navigate to="/" replace />
			</Show>
		</>
	);
};

export default ProtectedLayout;
