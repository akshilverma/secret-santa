import { PrismaClient } from "@prisma/client";
import cors, { CorsOptions } from "cors";
import { Router, json } from "express";

import { registerController } from "@/controllers/v1.controller";

const v1Router = Router();

const corsOptions: CorsOptions = {
    origin: "http://localhost:5173",
    methods: "POST",
};

// Enable CORS for register route
v1Router.use("/register", cors(corsOptions));

v1Router
    .post("/register", cors(corsOptions), json(), registerController)
    // TODO: Testing only. To be deleted.
    .get("/register", async (req, res) => {
        const { userId } = req.query;
        const prisma = new PrismaClient();
        const user = await prisma.userAccount.findUnique({
            where: {
                id: userId as string,
            },
        });
        res.send(user);
    });

export default v1Router;
