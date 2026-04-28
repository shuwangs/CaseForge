import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
    const navigate = useNavigate()
    return (
        <nav className="flex items-center justify-between px-16 py-4 bg-[var(--color-surface)] border-b border-gray-200">
            <div className="text-3xl font-semibold text-[var(--color-primary)]" >
                CaseForge
            </div>
            <div className="flex items-center gap-4">
                <span className="text-2xl text-gray-600">Bobo W.</span>
            </div>

        </nav >
    );
};

export default AppNavbar;
