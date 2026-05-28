const AICard = ({ loading, summary }) => {
	return (
		<div>
			{loading ? (
				<p>Generating AI summary...</p>
			) : summary ? (
				<p className="text-gray-700 leading-7">{summary}</p>
			) : (
				<p className="text-gray-400 text-sm">No summary generated yet.</p>
			)}
		</div>
	);
};

export default AICard;
