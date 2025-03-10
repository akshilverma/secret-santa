import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

import { hashPassword } from "#src/lib/auth.ts";

import { passwordSchema, registerSchema } from "#src/schemas/v1.schema.ts";

import { decodeBase64 } from "#src/utils/utils.ts";

export async function registerController(req: Request, res: Response) {
    try {
        const { username, email, password, confirm } = registerSchema.parse(
            req.body,
        );
        const decodedPassword = passwordSchema.parse(decodeBase64(password));
        const decodedConfirm = passwordSchema.parse(decodeBase64(confirm));
        if (decodedPassword !== decodedConfirm) {
            throw new Error("Passwords do not match.");
        }
        const passwordHash = await hashPassword(password);

        const prisma = new PrismaClient();

        // Create a user account with USER role
        await prisma.userAccount.create({
            data: {
                username,
                email,
                passwordHash,
            },
        });

        res.status(200)
            .header({ "Content-Type": "application/json" })
            .json({
                message: `User ${username} registered successfully`,
            });
    } catch (error) {
        console.error("Error registering:", error);
        // TODO: add proper error handling
        res.sendStatus(400);
    }
}
