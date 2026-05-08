import { requireAuth } from "@clerk/express";
import enqueueCitation from "../queues/citation.queue.js";
import { getPublicationsByProjectId } from "../services/publication.service.js";
import { idValidate } from "../utitls/idValidate.js";
import AppError from "../errors/AppError.js";

export const enqueueCitationJobs = async (req, res, next) => {
    try {
        console.log("In citation controller...");

        const clerkId = req.clerkId;
        const { projectId } = req.params;
        if (!idValidate(projectId)) {
            throw new AppError("Invalid project Id", 400)
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
            })

            console.log("after enqueueCitation");
        }

        res.status(200).json({
            success: true,
            message: "Citation jobs queued",
            jobsQueued: publications.length,
        })
    } catch (err) {
        next(err);
    }
}

export const fetchCitation = aync(workId) => {
    const OPENALEX_URL = process.env.OPENALEX_URL;
    try {
        const response = await fetch(`${OPENALEX_URL}${workId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch citations");
        }

        const data = await response.json();

        console.log("citation results:", data.results);

    } catch (err) {
        next(err)
    }

}