import { Show } from "@clerk/react";
import AppLayout from "./AppLayout.js";

const ProtectedLayout = () => {
	return (
		<>
			<Show when="signed-in">
				<AppLayout />
			</Show>
			{/* 
			<Show when="signed-out">
				<RedirectToSignIn />
			</Show> */}
		</>
	);
};

export default ProtectedLayout;
