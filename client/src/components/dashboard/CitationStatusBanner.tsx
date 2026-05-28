import useCitation from "../../contexts/useCitation.js";

const CitationStatusBanner = () => {
	const { citationStatus, totalJobsQueued } = useCitation();
	if (!citationStatus) return null;

	const total =
		citationStatus?.wait +
		citationStatus.active +
		citationStatus.completed +
		citationStatus.failed;

	const progress =
		total > 0
			? Math.round(
					((citationStatus.completed + citationStatus.failed) /
						totalJobsQueued) *
						100,
				)
			: 0;

	return (
		<div>
			<h3>Citation Fetch</h3>
			<p>Progress: {progress}%</p>

			<p>
				Completed: {citationStatus.completed} / {totalJobsQueued}
			</p>

			<p>Remaining: {totalJobsQueued - citationStatus.completed}</p>
			<p>Failed: {citationStatus.failed}</p>
			<p>Active: {citationStatus.active}</p>
			<p>Wait: {citationStatus.wait}</p>
		</div>
	);
};

export default CitationStatusBanner;
