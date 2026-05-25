const PageTitle = ({ children, className = "", ...rest }) => {
	return (
		<h1
			className={`text-xl font-semibold text-[var(--color-primary)]
				${className}
			`}
			{...rest}
		>
			{children}
		</h1>
	);
};
export default PageTitle;
