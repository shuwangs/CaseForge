const HeroContent = () => {
	return (
		<div className="bg-mint flex flex-col gap-8 pt-8">
			<div className="inline-flex w-fit items-center gap-2 rounded-full border ml-4 px-6 py-2">
				<span className="h-2 w-2 rounded-full bg-primary" />
				AI-Powered Evidence Analysis
			</div>
			<div>
				<h1>
					Turn your publications and citations into immigration-ready evidence.
				</h1>

				<p>
					CaseForge retrieves publication records from ORCID, maps citation
					activity, and turns scholarly impact into structured summaries for
					EB-1A and NIW case preparation.
				</p>
			</div>
			<div>
				<button className="">Start Free Analysis</button>

				<button className="">View Demo</button>
			</div>
		</div>
	);
};

export default HeroContent;
