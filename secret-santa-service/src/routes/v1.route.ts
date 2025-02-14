import { json, Router } from "express";
import { registerController } from "../controllers/v1.controller";
import { PrismaClient } from "@prisma/client";

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
