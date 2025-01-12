import { Router } from "express";
import { hashPassword } from "../lib/auth";

const v1Router = Router();

v1Router.post("/signup", async (req, res) => {
	const hashedPwd = await hashPassword(pwd);
	res.status(200).json({ pwd: hashedPwd });
});

export default v1Router;
