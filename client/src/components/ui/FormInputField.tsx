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
			<label className="text-sm font-semibold" htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className="border rounded-lg text-sm px-3 py-2 border-gray-200"
			/>
		</div>
	);
};

export default FormInputField;
