import { SignIn } from "@clerk/react";

const SignInPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-emerald-50">
			<div className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-lg">
				<h1 className="mb-4 text-center text-2xl font-bold text-[var(--color-primary)]">
					CaseForge
				</h1>
				<SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
			</div>
		</div>
	);
};

export default SignInPage;
