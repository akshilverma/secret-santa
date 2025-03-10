import app from "#src/app.ts";

const { PORT = "3000" } = process.env;

// Start server at PORT
const server = app
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
    .on("error", (error) => {
        console.error("Error starting server:", error.message);
    });

// Graceful shutdown
const shutdown = (signal: "SIGINT" | "SIGTERM") =>
    server.close(() => {
        console.log(`${signal} signal received: Shutting down server.`);
        process.exit(0);
    });

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
