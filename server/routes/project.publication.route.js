import { Router } from "express";
import { savePublications } from "../controllers/project.publication.controller.js";

const router = Router();

router.post("/:projectId/publications", savePublications);

export default router;
