import NewBtn from "../ui/NewBtn.tsx"
import useForm from "../../hooks/useForm.js";
import { Project } from "../../types/project.ts";
import FormInputField from "../ui/FormInputField.tsx";

const NewProjectForm = () => {

    const initialForm = {
        projectName: "",
        firstName: "",
        lastName: "",
        institution: "",
        researchArea: "",
        orcid: "",
        target: "EB1A",
    };
    const { formData, handleChange } = useForm(initialForm);

    const _handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // POST /api/projects
    };

    return (

        <form className="flex flex-col text-xl justify-center max-w-xl gap-4">

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
                label="Institution / Organization"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Harvard University"
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
                <NewBtn>Submit</NewBtn>
                <NewBtn>Clear</NewBtn>
            </div>

        </form >
    )
}

export default NewProjectForm;