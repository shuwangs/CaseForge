import FeatureCard from "../ui/FeatureCard.jsx";

const HeroFeatures = () => {
	return (
		<div>
			<div className="flex flex-col gap-4 align-center items-center py-6">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
					Simple Process
				</p>
				<h2 className="text-4xl font-bold tracking-tight text-[var(--color-primary)]">
					How CaseForge Works
				</h2>
				<p className="max-w-2xl text-lg leading-8 text-[var(--color-accent)]/80">
					Three simple steps to transform your research record
					into compelling immigration evidence.
				</p>
			</div>
			<div className="mt-16 grid gap-6 md:grid-cols-3">
				<FeatureCard
					title="Import Publications"
					description="Connect your ORCID profile or upload publication data to create a structured research portfolio."


				/>
				<FeatureCard
					title="Fetch Citation Data"
					description="CaseForge asynchronously retrieves, normalizes, and processes citation data from external scholarly APIs."
				/>
				<FeatureCard
					title="Generate Evidence Insights"
					description="Explore publication impact through citation analytics, geographic influence maps, and yearly research trends."
				/>

			</div >
		</div >
	);
};

export default HeroFeatures;
