import { useEffect } from "react";
import useCitation from "../../contexts/useCitation.js";

const CitationStatusBanner = () => {
	const { citationStatus, setCitationStatus } = useCitation();
	const {
		wait = 0,
		active = 0,
		completed = 0,
		failed = 0,
		total = 0,
	} = citationStatus || {};
	const isComplete = citationStatus && wait === 0 && active === 0;

	useEffect(() => {
		if (!isComplete) return;

		const timer = setTimeout(() => {
			setCitationStatus(null);
		}, 10000);

		return () => clearTimeout(timer);
	}, [isComplete, setCitationStatus]);

	if (!citationStatus) return null;

	const progress =
		total > 0 ? Math.round(((completed + failed) / total) * 100) : 0;

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-slate-800">Citation Processing</h3>

				<span className="text-sm text-slate-500">
					{isComplete ? "Complete" : "Processing"}
				</span>
			</div>

			<div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
				<div
					className="h-2 rounded-full bg-teal-600 transition-all duration-500"
					style={{ width: `${progress}%` }}
				/>
			</div>

			<p className="text-sm text-slate-700">{progress}% complete</p>

			<p className="text-sm text-slate-500">
				Processed {completed + failed} of {total} publications
			</p>

			{failed > 0 && (
				<p className="text-sm text-red-600">{failed} citation jobs failed</p>
			)}

			{!isComplete && (
				<p className="text-xs text-slate-400">
					You can continue using the dashboard while citations are processing.
				</p>
			)}
		</div>
	);
};

export default CitationStatusBanner;
