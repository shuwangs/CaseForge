import { Router } from "express";
import {
	createProject,
	deleteProject,
	getProjects,
} from "../controllers/project.controller.js";
import { savePublications } from "../controllers/project.publication.controller.js";

const router = Router();

router.post("/:projectId/publications", savePublications);
router.get("/user/:userId", getProjects);
router.post("/", createProject);
router.delete("/:id", deleteProject);

export default router;
