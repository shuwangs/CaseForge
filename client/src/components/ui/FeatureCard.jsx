const FeatureCard = ({ title, description, className }) => {
	return (
		<div
			className={`rounded-lg border border-gray-200 bg-white px-6 py-8 shadow-sm ${className}`}
		>
			<h3 className="text-lg font-semibold text-[var(--color-primary)]">
				{title}
			</h3>
			<p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
		</div>

	)

};

export default FeatureCard;
