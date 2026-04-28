import { Router } from "express";
import { savePublications } from "../controllers/project.publication.controller.js";
import { getProjects } from "../controllers/project.controller.js";
const router = Router();

router.post("/:projectId/publications", savePublications);
router.get("/user/:userId", getProjects);

export default router;
