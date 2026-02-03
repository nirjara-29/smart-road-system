import express from "express";
import cors from "cors";

import authTestRoutes from "./routes/authTestRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use("/api/auth", authTestRoutes);

export default app;

