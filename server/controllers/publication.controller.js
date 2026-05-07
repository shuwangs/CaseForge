import AppError from "../errors/AppError.js";
import {
	saveProjectPublication,
	searchPublicationsByOrcid,
} from "../services/publication.service.js";
import { validateOrcid } from "../utitls/publication.helper.js";

export const searchPublications = async (req, res, next) => {
	try {
		const { orcid } = req.body;
		const _clerkId = req.clerkId;

		if (!validateOrcid(orcid)) {
			throw new AppError("Wrong Orcid ID", 400);
		}

		const result = await searchPublicationsByOrcid(orcid);
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export const savePublications = async (req, res, next) => {
	try {
		const _clerkId = req.clerkId;

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
