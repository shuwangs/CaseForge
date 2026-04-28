const NewBtn = ({ onClick, children = "New", className = "" }) => {
	return (
		<button
			onClick={onClick}
			className={`
                bg-[var(--color-accent)] 
                text-white 
                px-4 py-2
                rounded-lg 
                text-md font-medium
                hover:opacity-80 
                transition 
                ${className}
            `}
		>
			{children}
		</button>
	);
};

export default NewBtn;
