import FeatureCard from "../ui/FeatureCard.jsx";

const HeroFeatures = () => {
	return (
		<div>
			<div className="flex flex-col gap-4 align-center items-center py-6">
				<h3>Simple Process</h3>

				<h2>How CaseForge Works</h2>
				<p>
					Three simple steps to transform your research record into compelling
					immigration evidence.
				</p>
			</div>
			<div className="flex  gap-4">
				<FeatureCard>
					Connect Your Profile
					<p>
						Paste your Google Scholar URL or upload a list of your publications.
						We handle the rest automatically.
					</p>
				</FeatureCard>
				<FeatureCard>
					Connect Your Profile
					<p>
						Paste your Google Scholar URL or upload a list of your publications.
						We handle the rest automatically.
					</p>
				</FeatureCard>
				<FeatureCard>
					Connect Your Profile
					<p>
						Paste your Google Scholar URL or upload a list of your publications.
						We handle the rest automatically.
					</p>
				</FeatureCard>
			</div>
		</div>
	);
};

export default HeroFeatures;
