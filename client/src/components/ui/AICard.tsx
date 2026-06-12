const AICard = ({ loading, summary }) => {
	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="flex items-center gap-2 mb-3">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-teal-700">
					✨
				</div>

				<div>
					<h3 className="text-sm font-semibold text-[var(--color-primary)]">
						Research Impact Summary
					</h3>
				</div>
			</div>

			{loading ? (
				<p className="text-sm leading-7 text-gray-700">Loading</p>
			) : summary ? (
				<p className="text-sm leading-7 text-gray-700">{summary}</p>
			) : (
				<p className="text-sm text-gray-400">No summary generated yet.</p>
			)}
		</div>
	);
};

export default AICard;
