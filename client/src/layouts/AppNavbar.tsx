import { Show, UserButton } from "@clerk/react";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
	const navigate = useNavigate();
	return (
		<nav className="flex items-center justify-between px-16 py-4 bg-[var(--color-surface)] border-b border-gray-200">
			<button
				type="button"
				className="text-3xl font-semibold text-[var(--color-primary)]"
				onClick={() => navigate("/projects")}
			>
				CaseForge
			</button>
			{/* <div className="flex items-center gap-4">
				<span className="text-2xl text-gray-600">Bobo W.</span>
			</div> */}
			<Show when="signed-in">
				<UserButton />
			</Show>
		</nav>
	);
};

export default AppNavbar;
