import express from "express";
import PingController from "../controllers/pingController";

const router = express.Router();

// define a route handler for the default home page
router.get("/", (req, res) => {
	res.send("HOME");
});

router.get("/helloworld", (req, res) => {
	res.send("Hello world!");
});

router.get("/ping", async (_req, res) => {
	const controller = new PingController();
	const response = await controller.getMessage();
	return res.send(response);
});

export default router;
