import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import NewProjectForm from "../components/forms/NewProjectForm.tsx";
import useProject from "../contexts/useProject.js";
import { validateOrcidId } from "../utils/validateOrcidId.js";

const NewProjectPage = () => {
	const { user_id, createProject, setError } = useProject();
	const navigate = useNavigate();

	const initialValues: ProjectFormValues = {
		userId: user_id,
		projectName: "",
		firstName: "",
		lastName: "",
		institution: "",
		researchArea: "",
		orcid: "",
		careerStage: "",
		target: "EB1A",
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		if (!validateOrcidId(formData.orcid)) {
			setError("Invalid ORCID ID");
			return;
		}

		try {
			setError("");
			await createProject(formData);
			navigate("/projects");
		} catch (err) {
			setError(err.message || "Failed to create project");
		}
	};
	return (
		<div className="flex flex-col mx-auto px-16 justify-center space-y-6 mt-8 max-w-5xl">
			<div>
				<Link
					to="/projects"
					className="flex text-xl justify-center gap-2 text-gray-500 text-semibold"
				>
					<IoArrowBack />
					<span>Back to Projects</span>
				</Link>
			</div>

			<div className="flex flex-col justify-center items-center rounded-lg border-2 border-[var(--color-accent)] px-6 py-6">
				<h1 className="text-2xl text-bold mb-2">Add a New Project</h1>
				<NewProjectForm
					mode="create"
					initialValues={initialValues}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default NewProjectPage;
