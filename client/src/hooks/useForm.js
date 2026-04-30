import { useState } from "react";

const useForm = (initialData) => {
	const [formData, setFormData] = useState(initialData);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setFormData(initialData);
	};
	return { formData, handleChange, resetForm, setFormData };
};

export default useForm;
