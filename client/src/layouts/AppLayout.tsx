import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar.tsx";

const AppLayout = () => {
	return (
		<div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-primary)]">
			<AppNavbar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;
