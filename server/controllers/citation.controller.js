import AppError from "../errors/AppError.js";
import { citationsQueue, enqueueCitation } from "../queues/citation.queue.js";
import { getPublicationsByProjectId } from "../services/publication.service.js";
import { getCitationMapData, getCitationCountsByYear, getCitationsCountByProjectId } from "../services/citation.service.js";
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

export const getCitationsMap = async (req, res, next) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const mapData = await getCitationMapData(projectId, clerkId);

		res.status(200).json({
			success: true,
			data: mapData,
		});

	} catch (err) {
		next(err);
	}
}

export const getCitationsYearlyCounts = async (req, res, next) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const yearlyCounts = await getCitationCountsByYear(projectId, clerkId);

		res.status(200).json({
			success: true,
			data: yearlyCounts,
		});

	} catch (err) {
		next(err);
	}
}

export const getProjectCitations = async (req, resq, next) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const citations = await getCitationsCountByProjectId(
			projectId,
			clerkId,
		);

		res.status(200).json({
			success: true,
			data: citations,
		});

	} catch (err) {
		next(err);
	}
}

export const getCitationStatus = async (req, res, next) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const citationStatus = await citationsQueue.getJobCounts('active', 'wait', 'completed', 'failed');

		res.status(200).json({
			success: true,
			projectId,
			clerkId,
			data: citationStatus,
		});
	} catch (err) {
		next(err);
	}
}
