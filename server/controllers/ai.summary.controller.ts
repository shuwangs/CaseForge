import type { NextFunction, Request, Response } from "express";
import {
	generateJournalImpactSummaryService,
	generateMapSummaryService,
	generateTrendSummaryService,
} from "../services/ai/ai.service.js";
import { getSummaryByProjectId } from "../services/summary.service.js";

export const generateJournalImpactSummary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
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

export const generateMapSummary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
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

export const generateTrendSummary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
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

export const getProjectSummary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { projectId } = req.params;
		const clerkId = req.clerkId;

		const summary = await getSummaryByProjectId(projectId, clerkId);

		res.status(200).json({
			success: true,
			data: summary,
		});
	} catch (err) {
		next(err);
	}
};
