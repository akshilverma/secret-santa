import express from "express";
import apiRouter from "@/routes/api.route";

const app = express();

// Health check endpoint
app.get("/health", (_, res) => {
	res.status(200).json({ status: "ok" });
});

// API routes
app.use("/api", apiRouter);

export default app;
