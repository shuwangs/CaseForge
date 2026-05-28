const ProjectDetailHeader = ({ children, className = "", ...rest }) => {
	return (
		<h1
			className={`text-md font-semibold text-[var(--color-primary)]
				${className}
			`}
			{...rest}
		>
			{children}
		</h1>
	);
};
export default ProjectDetailHeader;
