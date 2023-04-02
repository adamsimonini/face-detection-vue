import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import Router from "./routes";

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(express.static("public"));

// allow for cross origin resource sharing
// TODO: remove this work around if you plan to deploy this publicly
app.use(
	cors({
		origin: "*" // TODO: allowing requests from all locations, which needs to be removed if deployed publicly
	})
);

// activate swagger ui docks
// app.use(
// 	"/docs",
// 	swaggerUi.serve,
// 	swaggerUi.setup(undefined, {
// 		swaggerOptions: {
// 			url: "swagger/swagger.json"
// 		}
// 	})
// );

// expose all routes to app
app.use(Router);

// start the Express server
app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`);
});
