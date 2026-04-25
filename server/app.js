import cors from "cors";
import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import projectPublicationRoute from "./routes/project.publication.route.js";
import publicationRoute from "./routes/publication.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/publication", publicationRoute);
app.use("/api/projects", projectPublicationRoute);

app.use(errorHandler);
export default app;
