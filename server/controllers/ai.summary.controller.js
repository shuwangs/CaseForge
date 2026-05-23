import {
	generateJournalImpactSummaryService,
	generateMapSummaryService,
	generateTrendSummaryService,
} from "../services/ai/ai.service.js";

export const generateJournalImpactSummary = async (req, res, next) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const summary = await generateJournalImpactSummaryService(
			projectId,
			clerkId,
		);

		res.status(200).json({
			success: true,
			data: summary,
		});
	} catch (err) {
		next(err);
	}
};

export const generateMapSummary = async (req, res, next) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const summary = await generateMapSummaryService(projectId, clerkId);

		res.status(200).json({
			success: true,
			data: summary,
		});
	} catch (err) {
		next(err);
	}
};

export const generateTrendSummary = async (req, res, next) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const summary = await generateTrendSummaryService(projectId, clerkId);

		res.status(200).json({
			success: true,
			data: summary,
		});
	} catch (err) {
		next(err);
	}
};
