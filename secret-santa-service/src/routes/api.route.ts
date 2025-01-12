import { Router } from "express";
import v1Router from "./v1.route";

const apiRouter = Router();

// Add default middlewares for API routes here.

// Routes to support API versioning.
apiRouter.use("/v1", v1Router);

export default apiRouter;
