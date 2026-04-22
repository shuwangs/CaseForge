import { validateOrcidId } from "../utils/validateOrcidId.js";
import useProject from "../hooks/useProject.js";
import useForm from "../hooks/useForm.js";
import { useEffect } from "react";
const OrcidInput = () => {
	const { onFetchPubliction, publications, setPublications } = useProject();

	useEffect(() => {
		console.log("fetched publications are: ", publications);
	}, [publications]);

	useEffect(() => {
		console.log("fetched publications are: ", publications);
	}, []);

	const initialFormData = {
		projectName: "",
		orcidId: "",
	};

	const { formData, handleChange } = useForm(initialFormData);

	const handleSubmit = async (event) => {
		event.preventDefault();
		await onFetchPubliction(formData.orcidId);
		console.log("Submit Form", formData);
	};

	return (
		<div>
			<form action="POST" onSubmit={handleSubmit} className="">
				<div>
					<h1>New Project</h1>
					<p>Enter an ORCID to retrieve and analyze publications</p>
				</div>

				<div>
					<label htmlFor="projectName">Project Name</label>
					<input
						name="projectName"
						id="projectName"
						type="text"
						value={formData.projectName}
						onChange={handleChange}
						placeholder="NIW Petition"
					/>
				</div>

				<div>
					<label htmlFor="orcidId">ORCID ID</label>

					<input
						id="orcidId"
						name="orcidId"
						text="text"
						value={formData.orcidId}
						onChange={handleChange}
						required
						placeholder="0000-0000-1234-2234"
					/>
					<button type="button" onClick={validateOrcidId}>
						{" "}
						verify
					</button>
				</div>
				<button type="submit">Retrieve Publications</button>
			</form>
		</div>
	);
};

export default OrcidInput;
