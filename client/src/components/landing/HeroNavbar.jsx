import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const HeroNavbar = () => {
	return (
		<nav className="flex h-20 items-center justify-between">
			<div>
				<h1 className="text-2xl font-semibold">
					Case
					<span className="text-[var(--color-accent)]">Forge</span>
				</h1>
			</div>

			<div className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
				<a href="#features" className="hover:text-[var(--color-accent)]">
					Features
				</a>
				<a href="#workflow" className="hover:text-[var(--color-accent)]">
					How it Works
				</a>
				<a href="#pricing" className="hover:text-[var(--color-accent)]">
					Pricing
				</a>
			</div>

			<div className="flex items-center gap-3">
				<Show when="signed-out">
					<SignInButton>
						<button
							type="button"
							className="rounded-xl px-4 py-2 hover:bg-gray-100"
						>
							Login
						</button>
					</SignInButton>

					<SignUpButton>
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
