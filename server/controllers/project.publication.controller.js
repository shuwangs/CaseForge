import { getAuth } from "@clerk/express";
import { saveProjectPublication } from "../services/project.publication.service.js";

export const savePublications = async (req, res, next) => {
	try {
		const { userId: clerkId } = getAuth(req);
		console.log("clerkId is: ", clerkId);
		if (!clerkId) {
			throw new AppError("Unauthorized", 401);
		}

		const { projectId } = req.params;
		const { publications } = req.body;

		const result = await saveProjectPublication(projectId, publications);

		res.status(201).json({
			success: true,
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
