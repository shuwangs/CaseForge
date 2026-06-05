import FeatureCard from "../ui/FeatureCard.tsx";

const HeroFeatures = () => {
	return (
		<div>
			<section id="features">
				<div className="flex flex-col gap-4 align-center items-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
						Features
					</p>
					<h2 className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">
						From publication records to citation evidence
					</h2>
					<p className="max-w-2xl text-lg leading-6  text-gray-600">
						Three simple steps to transform your research record into compelling
						immigration evidence.
					</p>
				</div>
				<div className="mt-4 grid gap-6 md:grid-cols-3">
					<FeatureCard
						step="1"
						title="Import Publications"
						description="Connect your ORCID profile or upload publication data to create a structured research portfolio."
					/>
					<FeatureCard
						step="2"
						title="Fetch Citation Data"
						description="CaseForge asynchronously retrieves, normalizes, and processes citation data from external scholarly APIs."
					/>
					<FeatureCard
						step="3"
						title="Generate Evidence Insights"
						description="Explore publication impact through citation analytics, geographic influence maps, and yearly research trends."
					/>
				</div>
			</section>

			<section id="pricing" className="py-20">
				<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
					<p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)]">
						Pricing
					</p>
					<h2 className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">
						Start with a free analysis
					</h2>
					<p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
						CaseForge is currently focused on helping users create citation
						analysis projects and evaluate research impact evidence.
					</p>
				</div>
			</section>
		</div>
	);
};

export default HeroFeatures;
