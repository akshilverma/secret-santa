import { PrismaClient } from "@prisma/client";
import cors, { type CorsOptions } from "cors";
import { Router, json } from "express";

import { registerController } from "#src/controllers/v1.controller.ts";

const v1Router = Router();

const corsOptions: CorsOptions = {
    // TODO: origin to be updated based on environment variables
    origin: "http://localhost:5172",
    methods: "POST",
    maxAge: 600,
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
