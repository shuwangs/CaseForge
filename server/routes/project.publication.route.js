import { Router } from "express";
import {
	generateJournalImpactSummary,
	generateMapSummary,
	generateTrendSummary,
	getProjectSummary,
} from "../controllers/ai.summary.controller.js";
import {
	enqueueCitationJobs,
	getCitationStatus,
	getCitationsMap,
	getCitationsYearlyCounts,
	getProjectCitations,
} from "../controllers/citation.controller.js";
import {
	createProject,
	deleteProject,
	getProjectStatus,
	getProjects,
	putProject,
} from "../controllers/project.controller.js";
import {
	getProjectPublications,
	importProjectPublications,
	savePublications,
} from "../controllers/publication.controller.js";

const router = Router();

router.post("/:projectId/publications", savePublications);
router.get("/", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);
router.put("/:id", putProject);
router.post("/:projectId/citations/jobs", enqueueCitationJobs);
router.get("/:projectId/citation-counts", getProjectCitations);
router.get("/:projectId/yearly-counts", getCitationsYearlyCounts);
router.get("/:projectId/map", getCitationsMap);
router.get("/:projectId/citations/status", getCitationStatus);

// Save publications after fetch publications
router.post("/:projectId/publications/import", importProjectPublications);
router.get("/:projectId/publications", getProjectPublications);

// ai summary relate routes
router.post("/:projectId/ai/trend-summary", generateTrendSummary);
router.post("/:projectId/ai/map-summary", generateMapSummary);
router.post(
	"/:projectId/ai/journal-impact-summary",
	generateJournalImpactSummary,
);

router.get("/:projectId/ai/summary", getProjectSummary);

// Project status
router.get("/:projectId/status", getProjectStatus);
export default router;
