const FeatureCard = ({ children, className }) => {
	return <div className={`rounded-xl shadow-md ${className}`}>{children}</div>;
};

export default FeatureCard;
