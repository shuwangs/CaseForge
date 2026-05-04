import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const HeroNavbar = () => {
	return (
		<nav className="flex justify-between py-4 bg-olive">
			<div>
				<h1 className="text-2xl font-bold text-forest">
					Case
					<span className="text-primary">Forge</span>
				</h1>
			</div>

			<div className="flex gap-8 items-center text-xl ">
				<a href="#features" className="hover:text-primary">
					Features
				</a>
				<a href="#workflow" className="hover:text-primary">
					How it Works
				</a>
				<a href="#pricing" className="hover:text-primary">
					Pricing
				</a>
			</div>

			<div className="flex px-15 text-2xl gap-6">
				<Show when="signed-out">
					<SignInButton >
						<button
							type="button"
							className="rounded-xl px-4 py-2 hover:bg-gray-100"
						>
							Login
						</button>
					</SignInButton>

					<SignUpButton >
						<button type="button" className="bg-primary rounded-xl px-4 py-2">
							Start Free
						</button>
					</SignUpButton>
				</Show>

				<Show when="signed-in">
					<UserButton />
				</Show>
			</div>
		</nav>
	);
};
export default HeroNavbar;
