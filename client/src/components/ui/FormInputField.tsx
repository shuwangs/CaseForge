
interface FormInputFieldProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    placeholder?: string;

}
const FormInputField = ({ label, id, name, value, onChange, placeholder }: FormInputFieldProps) => {
    return (
        <div className="flex flex-col">
            <label
                className="text-lg font-semibold"
                htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="border-2 rounded-md px-3 py-2 border-[var(--color-accent)]"
            />
        </div>
    )
}

export default FormInputField;