import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ProjectFormValues } from "../../types/project.ts";
import NewProjectForm from "../components/forms/NewProjectForm.js";
import useProject from "../contexts/useProject.js";

const NewProjectPage = () => {
	const { user_id, projects, onUpdateProject } = useProject();
	const navigate = useNavigate();
	const { projectId } = useParams();

	const currProject = projects.find((p) => Number(p.id) === Number(projectId));

	if (!currProject) {
		return <div>Loading project...</div>;
	}
	const initialValues: ProjectFormValues = {
		userId: currProject.userId ?? user_id,
		projectName: currProject.projectName ?? "",
		firstName: currProject.firstName ?? "",
		lastName: currProject.lastName ?? "",
		institution: "",
		researchArea: currProject.researchArea ?? "",
		orcid: currProject.orcid ?? "",
		careerStage: currProject.careerStage ?? "",
		target: currProject.target ?? "EB1A",
	};

	const handleSubmit = async (values: ProjectFormValues) => {
		await onUpdateProject(currProject.id, values);
		navigate(`/projects/${currProject.id}`);
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
				<h1 className="text-2xl text-bold mb-2">Edit Project</h1>
				<NewProjectForm
					mode="edit"
					initialValues={initialValues}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default NewProjectPage;
