import AppError from "../errors/AppError.js";
import enqueueCitation from "../queues/citation.queue.js";
import { getPublicationsByProjectId } from "../services/publication.service.js";
import { idValidate } from "../utitls/idValidate.js";

export const enqueueCitationJobs = async (req, res, next) => {
	try {
		console.log("In citation controller...");

		const clerkId = req.clerkId;
		const { projectId } = req.params;
		if (!idValidate(projectId)) {
			throw new AppError("Invalid project Id", 400);
		}

		const publications = await getPublicationsByProjectId(clerkId, projectId);

		if (!publications.length) {
			return res.status(404).json({
				success: false,
				message: "No publications found for this project",
			});
		}

		for (const pub of publications) {
			if (!pub.openalex_id) {
				continue;
			}

			await enqueueCitation({
				clerkId,
				projectId,
				publicationOpenAlexId: pub.openalex_id,
			});

			console.log("after enqueueCitation id: ", pub.openalex_id);
		}

		res.status(200).json({
			success: true,
			message: "Citation jobs queued",
			jobsQueued: publications.length,
		});
	} catch (err) {
		next(err);
	}
};
