import { SignIn } from "@clerk/react";

const SignInPage = () => {
	return (
		<div className="px-20">
			<SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
		</div>
	);
};

export default SignInPage;
