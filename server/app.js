import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import clerkWebhook from "./routes/clerkWebhook.route.js";
import projectPublicationRoute from "./routes/project.publication.route.js";
import publicationRoute from "./routes/publication.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors());

// The data passed by clerkWebhook is raw
app.use("/api/webhook", clerkWebhook);

app.use(express.json());

app.use(clerkMiddleware());
app.use("/api/user", requireAuth(), userRoute);
app.use("/api/publications", requireAuth(), publicationRoute);
app.use("/api/projects", requireAuth(), projectPublicationRoute);

app.use(errorHandler);

export default app;
