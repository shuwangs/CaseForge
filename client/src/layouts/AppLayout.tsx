import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar.tsx";
import AppSidebar from "./AppSidebar.tsx"
const AppLayout = () => {
	return (
		<div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-primary)]">
			<AppNavbar />
			<div className="flex">
				<AppSidebar />
				<main className="min-w-0 flex-1 px-8 py-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
