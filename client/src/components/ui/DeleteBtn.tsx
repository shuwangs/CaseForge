const DeleteBtn = ({ onClick, children = "New", className = "" }) => {
	return (
		<button
			type="submit"
			onClick={onClick}
			className={`
                bg-gray-300
                text-[var(--color-primary)]
                px-4 py-2
                rounded-lg 
                text-md font-medium
                hover:bg-red-400
                transition 
                ${className}`}
		>
			{children}
		</button>
	);
};

export default DeleteBtn;
