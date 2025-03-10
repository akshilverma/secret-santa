import { Router } from "express";

import v1Router from "#src/routes/v1.route.ts";

const apiRouter = Router();

// Add default middlewares for API routes here.

// Routes to support API versioning.
apiRouter.use("/v1", v1Router);

export default apiRouter;
