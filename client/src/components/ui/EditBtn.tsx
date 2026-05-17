const EditBtn = ({ onClick, children = "New", className = "", ...rest }) => {
	return (
		<button
			onClick={onClick}
			className={`
                bg-gray-300
				border border-[var(--color-secondary)]
				bg-white
				px-3 py-2
                text-[var(--color-secondary)]
                rounded-lg 
                text-md font-medium
				hover:bg-lime-200
				hover:text-[var(--color-accent)]
                transition 
                ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default EditBtn;
