import HeroContent from "../components/landing/HeroContent.jsx";
import HeroFeatures from "../components/landing/HeroFeatures.jsx";
import HeroNavbar from "../components/landing/HeroNavbar.jsx";

const LandingPage = () => {
	return (
		<div className="px-20">
			<HeroNavbar />
			<HeroContent />
			<HeroFeatures />
		</div>
	);
};

export default LandingPage;
