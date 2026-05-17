const ProjectProgress = ({ hasPublications, hasCitations }) => {
	const currentStep = !hasPublications
		? "Import publications"
		: !hasCitations
			? "Fetch citations"
			: "View dashboard";

	return (
		<section className="rounded-xl border  border-gray-100 p-6 bg-[var(--color-surface)] shadow-sm">
			<h2 className="text-xl font-semibold text-[var(--color-primary)]">
				Progress
			</h2>

			<div className="mt-5 flex items-center gap-3 text-lg">
				<span className="font-medium text-[var(--color-secondary)]">
					✓ Project Info
				</span>
				<span
					className={
						hasPublications ? "text-[var(--color-secondary)]" : "text-gray-300"
					}
				>
					→
				</span>
				<span
					className={
						hasPublications
							? "font-medium text-[var(--color-secondary)]"
							: "text-gray-500"
					}
				>
					{hasPublications ? "✓" : "○"} Publications
				</span>
				<span
					className={
						hasCitations ? "text-[var(--color-secondary)]" : "text-gray-300"
					}
				>
					→
				</span>
				<span
					className={
						hasCitations
							? "font-medium text-[var(--color-secondary)]"
							: "text-gray-500"
					}
				>
					{hasCitations ? "✓" : "○"} Citations
				</span>
				<span className="text-gray-300">→</span>
				<span
					className={
						hasCitations
							? "font-mediumtext-[var(--color-secondary)]"
							: "text-gray-500"
					}
				>
					{hasCitations ? "✓" : "○"} Results
				</span>
			</div>

			<div className="mt-5 rounded-lg bg-gray-50 p-4">
				<p className="text-md font-medium text-gray-700">
					Next step: {currentStep}
				</p>

				<p className="mt-1 text-sm text-gray-500">
					{!hasPublications
						? "Start by importing publications from the ORCID saved in this project."
						: !hasCitations
							? "Now fetch citation records for the imported publications."
							: "Your Result dashboard is ready to review."}
				</p>
			</div>
		</section>
	);
};

export default ProjectProgress;
