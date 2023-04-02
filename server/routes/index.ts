import express from "express";
import PingController from "../controllers/pingController";
import HelloWorldController from "../controllers/helloWorldController";

const router = express.Router();

// define a route handler for the default home page
router.get("/", (req, res) => {
	res.send("HOME");
});

router.get("/helloworld", async (req, res) => {
	const controller = new HelloWorldController();
	const response = await controller.hello(req);
	return res.send(response.message);
});

router.get("/face-highlighting", (req, res) => {
	res.send("Hello world!");
});

router.get("/ping", async (_req, res) => {
	const controller = new PingController();
	const response = await controller.getMessage();
	return res.send(response);
});

export default router;
