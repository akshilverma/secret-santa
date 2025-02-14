import { PrismaClient } from "@prisma/client";
import { Router, json } from "express";

import { registerController } from "@/controllers/v1.controller";

const v1Router = Router();

v1Router
    .post("/register", json(), registerController)
    // Testing only. To be deleted.
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
