import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NewBtn from "../components/ui/NewBtn.tsx";
import useForm from "../hooks/useForm.js";

const NewProjectPage = () => {
	const navigate = useNavigate();
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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// POST /api/projects
	};

	return (
		<div className="mx-auto px-16 space-y-6 mt-8">
			<div
				onClick={() => navigate("/projects")}
				className="flex text-2xl justify-center items-center gap-2"
			>
				<IoArrowBack />
				<span>Back to Projects</span>
			</div>
			<form className="flex flex-col text-xl justify-center">
				<div>New Project</div>
				<div>
					<label>Project Name </label>
					<input />
				</div>
				<div>
					<label>First Name</label>
					<input />
					<label>Last Name</label>
					<input />
				</div>
				<div>
					<label>Institution / Organization</label>
					<input />
				</div>

				<div>
					<label>Research Field </label>
					<input />
				</div>
				<div>
					<label>Project Name </label>
					<input />
				</div>
				<div>
					<label>Orcid ID</label>
					<input />
				</div>

				<div>
					<label>Petition Type </label>
					<select>
						<option>EB-1A Extraordinary Ability</option>
						<option>NIW National Interest Waiver</option>
						<option>O1 </option>
					</select>
				</div>
			</form>
		</div>
	);
};

export default NewProjectPage;
