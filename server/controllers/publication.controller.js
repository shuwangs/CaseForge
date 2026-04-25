import AppError from "../errors/AppError.js";
import { searchPublicationsByOrcid } from "../services/publication.service.js";
import { validateOrcid } from "../utitls/publication.helper.js";

export const searchPublications = async (req, res, next) => {
	try {
		const { orcid } = req.body;

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
