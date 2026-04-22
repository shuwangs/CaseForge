import AppError from "../errors/appError.js";
import { searchPublicationsByOrcid } from "../services/publication.service.js";
import { validateOrcid } from "../utitls/publication.helper.js";

export const searchPublications = async (req, res, next) => {
	try {
		const { orcid } = req.body;
		console.log("orcid id is: ", orcid);

		if (!validateOrcid(orcid)) {
			throw new AppError("Wrong Orcid ID", 400);
		}

		const result = await searchPublicationsByOrcid(orcid);
		console.log("results in pubulication controller: ", result);
		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
