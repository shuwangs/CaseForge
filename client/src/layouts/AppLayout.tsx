import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar.tsx";

const AppLayout = () => {
    return (
        <div>
            <AppNavbar />
            <main className="p-6">
                <Outlet />
            </main>

        </div>)
}

export default AppLayout;