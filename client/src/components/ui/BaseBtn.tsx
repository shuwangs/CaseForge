const variants = {
	primary: `
        bg-[var(--color-accent)]
		text-white
		border border-[var(--color-accent)]
		hover:bg-[var(--color-primary)]
		hover:border-[var(--color-primary)]
    `,

	secondary: `
        border border-gray-300
		bg-white
		text-[var(--color-primary)]
		hover:bg-lime-200
		hover:text-[var(--color-accent)]
		hover:bg-blue-50
    `,
	danger: `
		border border-red-200
		bg-white
		text-red-600
		hover:bg-red-50
		hover:border-red-300
	`,

	ghost: `
		order border-transparent
		bg-transparent
		bg-gray-100
		text-gray-600
		hover:bg-gray-100
		hover:text-[var(--color-primary)]
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
				inline-flex items-center justify-center gap-2
				px-4 py-1.5
				rounded-lg
				text-sm font-medium
				leading-none
				transition-colors
				focus:outline-none
				focus:ring-2
				focus:ring-[var(--color-accent)]
				focus:ring-offset-2
				disabled:cursor-not-allowed
				disabled:opacity-50
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
