const variants = {
	primary: `
        bg-[var(--color-accent)]
		text-white
		hover:opacity-80
    `,

	secondary: `
        border border-[var(--color-secondary)]
		bg-white
		text-[var(--color-secondary)]
		hover:bg-lime-200
		hover:text-[var(--color-accent)]
    `,
	danger: `
		border border-red-200
		bg-white
		text-red-600
		hover:bg-red-50
		hover:border-red-300
	`,

	ghost: `
        border border-gra-100
		bg-gray-100
		text-gray-600
		hover:bg-gray-300
	`,
};

const BaseBtn = ({
	children,
	variant = "primary",
	type = "button",
	className = "",
	...rest
}) => {
	return (
		<button
			type={type}
			className={`
				px-4 py-2
				rounded-lg
				text-md font-medium
				transition
				${variants[variant]}
				${className}
			`}
			{...rest}
		>
			{children}
		</button>
	);
};
export default BaseBtn;
