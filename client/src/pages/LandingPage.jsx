import HeroContent from "../components/landing/HeroContent.jsx";
import HeroFeatures from "../components/landing/HeroFeatures.jsx";
import HeroNavbar from "../components/landing/HeroNavbar.jsx";

const LandingPage = () => {
	return (
		<div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-primary)]">
			<div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
				<HeroNavbar />
				<HeroContent />
				<HeroFeatures />
			</div>

		</div>
	);
};

export default LandingPage;
