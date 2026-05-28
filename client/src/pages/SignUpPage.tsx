import { SignUp } from "@clerk/react";

const SignUpPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
			<div className="rounded-2xl bg-[var(--color-surface)] p-6 shadow-lg">
				<h1 className="mb-4 text-center text-2xl font-bold text-[var(--color-primary)]">
					CaseForge
				</h1>
				<SignUp />
			</div>
		</div>
	);
};

export default SignUpPage;
