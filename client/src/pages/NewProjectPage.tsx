import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import NewProjectForm from "../components/forms/NewProjectForm.tsx";

const NewProjectPage = () => {
	return (
		<div className="flex flex-col mx-auto px-16 justify-center space-y-6 mt-8">
			<div>
				<Link
					to="/projects"
					className="flex text-xl justify-center gap-2 text-gray-500 text-semibold"
				>
					<IoArrowBack />
					<span>Back to Projects</span>
				</Link>
			</div>

			<div className="flex justify-center">
				<NewProjectForm />
			</div>
		</div>
	);
};

export default NewProjectPage;
