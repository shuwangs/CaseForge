import { SignUpButton } from "@clerk/react";
import { GoCheckCircle } from "react-icons/go";
import BaseBtn from "../ui/BaseBtn.js";
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

			<section id="pricing" className="pt-10 pb-16">
				<div className="">
					<div className="flex flex-col gap-4 align-center items-center mb-3">
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
							Pricing
						</p>
						<h2 className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">
							Start with a free analysis
						</h2>
						<p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
							Create your first citation analysis project for free. Paid plans
							will unlock higher usage limits, exports, and advanced evidence
							workflows.
						</p>
					</div>
					<div className="mx-auto grid  max-w-3xl gap-8 md:grid-cols-2">
						<div className=" h-full rounded-lg border border-[var(--color-accent)] bg-white p-6 shadow-sm ">
							<p className="text-sm font-medium text-gray-500">Early access</p>

							<div className="mt-3 flex items-end gap-1">
								<span className="text-3xl font-semibold text-[var(--color-primary)]">
									$0
								</span>
								<span className="pb-1 text-sm text-gray-500">today</span>
							</div>
							<ul className="mt-4 space-y-2 text-sm text-gray-600">
								<li>
									<div className="flex items-center gap-1">
										<span>
											<GoCheckCircle className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
										</span>
										Publication import
									</div>
								</li>
								<li>
									<div className="flex items-center gap-1">
										<span>
											<GoCheckCircle className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
										</span>
										Citation dashboard
									</div>
								</li>
								<li>
									<div className="flex items-center gap-1">
										<span>
											<GoCheckCircle className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
										</span>
										Research impact summary
									</div>
								</li>
							</ul>
							<p className="mt-3 text-sm text-gray-600">
								Free while core citation workflows are being expanded.
							</p>

							<div className="mt-auto pt-6">
								<SignUpButton>
									<BaseBtn className="w-full">Start Free</BaseBtn>
								</SignUpButton>
							</div>
						</div>

						<div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
							<p className="text-sm font-medium text-gray-500">Paid plans</p>

							<div className="mt-3 flex items-end gap-1">
								<span className="text-3xl font-semibold text-[var(--color-primary)]">
									Coming soon
								</span>
							</div>

							<ul className="mt-4 space-y-2 text-sm text-gray-600">
								<li>Higher project limits</li>
								<li>Advanced exports</li>
								<li>Expanded evidence summaries</li>
							</ul>
							<p className="mt-3 text-sm leading-6 text-gray-600">
								Paid tiers will support higher usage limits and more complete
								evidence preparation workflows.
							</p>
							<div className="mt-auto pt-6">
								<BaseBtn variant="secondary" className="w-full">
									Coming Soon
								</BaseBtn>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HeroFeatures;
