import cors from "cors";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import clerkWebhook from "./routes/clerkWebhook.route.js";
import projectPublicationRoute from "./routes/project.publication.route.js";
import publicationRoute from "./routes/publication.route.js";

const app = express();

app.use(cors());

// The data passed by clerkWebhook is raw
app.use("/api/webhook", clerkWebhook);

app.use(express.json());

app.use("/api/publications", publicationRoute);
app.use("/api/projects", projectPublicationRoute);

app.use(errorHandler);

export default app;
