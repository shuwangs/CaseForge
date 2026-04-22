import HeroContent from "../components/LandingSection/HeroContent.jsx";
import HeroFeatures from "../components/LandingSection/HeroFeatures.jsx";
import HeroNavbar from "../components/LandingSection/HeroNavbar";

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
