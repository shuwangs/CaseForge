const HeroContent = () => {
	return (
		<div className="flex flex-col justify-center py-16">
			<div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-muted)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-accent)] shadow-sm">
				<span className="h-2 w-2 rounded-full bg-[var(--color-secondary)]" />
				AI-powered citation evidence
			</div>
			<div className="mt-8 max-w-4xl space-y-6">
				<h1 className="text-5xl font-semibold leading-tight text-[var(--color-primary)] sm:text-6xl">
					Turn scholarly impact into immigration-ready evidence.
				</h1>

				<p className="max-w-2xl text-lg leading-8 text-gray-600">
					CaseForge retrieves publication records, maps citation activity, and
					organizes research impact into structured evidence for EB-1A and NIW
					case preparation.
				</p>
			</div>
			<div>
				<button className="" type="button">
					Start Free Analysis
				</button>

				<button className="" type="button">
					View Demo
				</button>
			</div>
		</div>
	);
};

export default HeroContent;
