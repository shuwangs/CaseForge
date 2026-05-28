import { clerkMiddleware } from "@clerk/express";
import { expressMiddleware } from '@as-integrations/express5';
import cors from "cors";
import express from "express";
import { authMiddleware } from "./middleware/authMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import clerkWebhook from "./routes/clerkWebhook.route.js";
import projectPublicationRoute from "./routes/project.publication.route.js";
import publicationRoute from "./routes/publication.route.js";
import userRoute from "./routes/user.route.js";

import server from "./graphql/index.ts";
import { createContext } from "./graphql/context.ts";

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

await server.start();
// Specify the path where we'd like to mount our server
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, { context: createContext }),
);

export default app;
