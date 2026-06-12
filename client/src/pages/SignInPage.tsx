import { SignIn } from "@clerk/react";
import { Link } from "react-router-dom";

const SignInPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-emerald-50">
			<div className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-lg">
				<Link
					to="/"
					className="mb-4 block text-center text-2xl font-bold text-[var(--color-primary)]"
				>
					CaseForge
				</Link>
				<SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
			</div>
		</div>
	);
};

export default SignInPage;
