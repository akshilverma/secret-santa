import { Router } from "express";

const v1Router = Router();

v1Router.post("/signup", (req, res) => {
	res.sendStatus(200);
});

export default v1Router;
