import express from "express";
import cors from "cors";
import helloRoute from "./routes/hello.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", helloRoute);

export default app;
