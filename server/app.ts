import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";
import { authMiddleware } from "./middleware/authMiddleware.ts";
import errorHandler from "./middleware/errorHandler.ts";
import clerkWebhook from "./routes/clerkWebhook.route.ts";
import projectPublicationRoute from "./routes/project.publication.route.ts";
import publicationRoute from "./routes/publication.route.ts";
import userRoute from "./routes/user.route.ts";

const app = express();

app.use(cors());

// The data passed by clerkWebhook is raw
app.use("/api/webhook", clerkWebhook);

app.use(clerkMiddleware());

app.use(express.json());

app.use("/api/user", authMiddleware, userRoute);
app.use("/api/publications", authMiddleware, publicationRoute);
app.use("/api/projects", authMiddleware, projectPublicationRoute);

app.use(errorHandler);

export default app;
