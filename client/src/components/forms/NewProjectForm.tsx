import useProject from "../../contexts/useProject.js";
import useForm from "../../hooks/useForm.js";
import type { Project, ProjectFormValues } from "../../types/project.ts";
import FormInputField from "../ui/FormInputField.tsx";
import NewBtn from "../ui/NewBtn.tsx";

interface ProjectFormProps {
	initialValues: ProjectFormValues;
	mode: "create" | "edit";
	onSubmit: (values: ProjectFormValues) => Promise<Project>;
}

const NewProjectForm = ({
	initialValues,
	mode = "create",
	onSubmit,
}: ProjectFormProps) => {
	const { error } = useProject();
	const { formData, handleChange, resetForm } = useForm(initialValues);

	const handleClear = () => {
		resetForm();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("FORM submit values:", formData);
		await onSubmit(formData);
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col text-xl justify-center max-w-xl gap-4"
		>
			<FormInputField
				label="Project Name"
				id="projectName"
				name="projectName"
				value={formData.projectName}
				onChange={handleChange}
				placeholder="Enter Project Name"
			/>
			<div className="flex justify-between">
				<FormInputField
					label="First Name"
					id="firstName"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
					placeholder="First Name"
				/>

				<FormInputField
					label="Last Name"
					id="lastName"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
					placeholder="Last Name"
				/>
			</div>
			<FormInputField
				label="Institution / Organization*"
				id="institution"
				name="institution"
				value={formData.institution}
				onChange={handleChange}
				placeholder="Harvard University"
				required
			/>

			<FormInputField
				label="Research Field"
				id="researchArea"
				name="researchArea"
				value={formData.researchArea}
				onChange={handleChange}
				placeholder="biomedical"
			/>

			<FormInputField
				label="Career Stage"
				id="careerStage"
				name="careerStage"
				value={formData.careerStage}
				onChange={handleChange}
				placeholder="Postdoc researcher "
			/>
			<FormInputField
				label="Orcid ID"
				id="orcid"
				name="orcid"
				value={formData.orcid}
				onChange={handleChange}
				placeholder="0000-0000-0002-0005"
			/>
			{error && <p className="text-sm text-red-500">{error}</p>}

			<div>
				<label htmlFor="target">Petition Type</label>
				<select
					className="px-4 py-2"
					id="target"
					name="target"
					value={formData.target}
					onChange={handleChange}
				>
					<option value="EB1A">EB-1A Extraordinary Ability</option>
					<option value="NIW">NIW National Interest Waiver</option>
					<option value="O1">Extraordinary Ability visa</option>
				</select>
			</div>
			<div className="flex gap-10 justify-center">
				<NewBtn type="submit">
					{mode === "edit" ? "Save Changes" : "Create Project"}
				</NewBtn>
				<button type="button" onClick={handleClear}>
					Clear
				</button>
			</div>
		</form>
	);
};

export default NewProjectForm;
