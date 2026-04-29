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

	const _handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// POST /api/projects
	};

	return (
		<div className="mx-auto px-16 space-y-6 mt-8">
			<button
				onClick={() => navigate("/projects")}
				className="flex text-2xl justify-center items-center gap-2"
			>
				<IoArrowBack />
				<span>Back to Projects</span>
			</button>
			<form className="flex flex-col text-xl justify-center">
				<div>New Project</div>
				<div>
					<label htmlFor="projectName">Project Name </label>
					<input
						id="projectName"
						name="projectName"
						placeholder="Enter Project Name"
					/>
				</div>
				<div>
					<label htmlFor="firstName">First Name</label>
					<input id="firstName" name="firstName" placeholder="Bobo" />

					<label htmlFor="lastName">Last Name</label>
					<input id="lastName" name="lastName" placeholder="Wang" />
				</div>
				<div>
					<label htmlFor="institution">Institution / Organization</label>
					<input
						id="institution"
						name="institution"
						placeholder="HomeStay University"
					/>
				</div>

				<div>
					<label htmlFor="researchArea">Research Field </label>
					<input
						id="institution"
						name="institution"
						placeholder="HomeStay University"
					/>
				</div>
				<div>
					<label htmlFor="careerStage">Career Stage</label>
					<input id="careerStage" name="careerStage" placeholder="Advisor" />
				</div>
				<div>
					<label htmlFor="orcid">Orcid ID</label>
					<input id="orcid" name="orcid" placeholder="0000-0002-2164-6551" />
				</div>

				<div>
					<label htmlFor="target">Petition Type </label>
					<select id="target" name="target">
						<option>EB-1A Extraordinary Ability</option>
						<option>NIW National Interest Waiver</option>
						<option>O1 </option>
					</select>
				</div>

				<NewBtn>Submit</NewBtn>
			</form>
		</div>
	);
};

export default NewProjectPage;
