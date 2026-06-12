const FeatureCard = ({ title, description, className, step }) => {
	return (
		<div
			className={`rounded-lg border border-gray-200 bg-white px-6 py-6 shadow-sm ${className}`}
		>
			{step && (
				<div className="mb-4 flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-xs font-semibold text-[var(--color-accent)]">
					{step}
				</div>
			)}

			<h3 className="text-lg font-semibold text-[var(--color-primary)]">
				{title}
			</h3>

			<p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
		</div>
	);
};

export default FeatureCard;
