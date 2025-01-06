import express from "express";

const app = express();

const { PORT = 3000 } = process.env;

// TODO: convert app to application.ts and add routes
app.get("/health", (_, res) => {
	res.status(200).json({ status: "ok" });
});

app.get("/api/v1", () => console.log("API v1"));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
}).on("error", (error) => {
	console.error("Error starting server:", error);
});
