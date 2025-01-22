import type { Request, Response } from "express";
import { hashPassword } from "@/lib/auth";
import { registerSchema } from "@/schemas/v1.schema";
import { PrismaClient } from "@prisma/client";

export async function registerController(req: Request, res: Response) {
	try {
		const { username, email, password } = registerSchema.parse(req.body);
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
		res.sendStatus(400);
	}
}
