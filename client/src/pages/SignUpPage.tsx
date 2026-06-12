import { SignUp } from "@clerk/react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
			<div className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-lg">
				<Link
					to="/"
					className="mb-4 block text-center text-2xl font-bold text-[var(--color-primary)]"
				>
					CaseForge
				</Link>
				<SignUp />
			</div>
		</div>
	);
};

export default SignUpPage;
