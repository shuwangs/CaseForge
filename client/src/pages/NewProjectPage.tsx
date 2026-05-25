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

	const handleSubmit = async (values: ProjectFormValues) => {
		console.log(values);
		if (!validateOrcidId(values.orcid)) {
			setError("Invalid ORCID ID");
			return;
		}

		try {
			setError("");
			await createProject(values);
			// setPublications([]);
			navigate("/projects");
		} catch (err) {
			setError(err.message || "Failed to create project");
		}
	};
	return (
		<div className="flex flex-col mx-auto px-16 justify-center mt-4 max-w-3xl ">
			<div>
				<Link
					to="/projects"
					className="flex text-sm items-center justify-center gap-2 text-gray-500 font-semibold mb-2"
				>
					<IoArrowBack />
					<span>Back to Projects</span>
				</Link>
			</div>

			<div className="flex flex-col justify-center items-center rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 shadow-sm">
				<h1 className="text-lg font-bold mb-2">Create Project</h1>
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
