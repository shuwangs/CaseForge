import { saveProjectPublication } from "../services/project.publication.service.js";

export const savePublications = async (req, res, next) => {
	try {
		const { projectId } = req.params;
		const { publications } = req.body;

		console.log("in controller, project to be inserted: ", projectId);
		console.log("in controller, tobe saved publications are: ", publications);

		const result = await saveProjectPublication(projectId, publications);

		res.status(201).json({
			success: true,
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
