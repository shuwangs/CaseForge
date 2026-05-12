import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar.tsx";
import AppSidebar from "./AppSidebar.tsx"
const AppLayout = () => {
	return (
		<div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-primary)]">
			<AppNavbar />
			<div className="flex">
				<AppSidebar />
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
