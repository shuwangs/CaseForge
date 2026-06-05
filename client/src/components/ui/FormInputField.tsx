interface FormInputFieldProps {
	label: string;
	id: string;
	name: string;
	value: string;
	onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
	placeholder?: string;
}
const FormInputField = ({
	label,
	id,
	name,
	value,
	onChange,
	placeholder,
}: FormInputFieldProps) => {
	return (
		<div className="flex flex-col">
			<label
				className="mb-1.5 text-sm font-medium text-[var(--color-primary)]"
				htmlFor={id}
			>
				{label}
			</label>
			<input
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className="w-full rounded-lg border border-gray-300 
					bg-white px-3 py-2 text-sm text-[var(--color-primary)] placeholder:text-gray-400 focus:border-[var(--color-accent)]
					focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
			/>
		</div>
	);
};

export default FormInputField;
