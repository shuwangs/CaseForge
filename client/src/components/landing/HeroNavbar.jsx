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
				<button className="rounded-xl px-4 py-2" type="button">
					Login
				</button>
				<button className="bg-primary rounded-xl px-4 py-2" type="button">
					Start Free
				</button>
			</div>
		</nav>
	);
};
export default HeroNavbar;
