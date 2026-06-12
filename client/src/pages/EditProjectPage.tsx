import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ProjectFormValues } from "../../types/project.ts";
import NewProjectForm from "../components/forms/NewProjectForm.js";
import useProject from "../contexts/useProject.js";

const EditProjectPage = () => {
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
		institution: currProject.institution ?? "",
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
		<div className="flex flex-col mx-auto px-16 justify-center space-y-6 mt-8 max-w-3xl">
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
				<h1 className="text-lg font-bold mb-2">Edit Project</h1>
				<NewProjectForm
					mode="edit"
					initialValues={initialValues}
					onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default EditProjectPage;
