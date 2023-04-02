import express from "express";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(express.static("public"));

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: "swagger/swagger.json"
		}
	})
);

app.use(Router);

// start the Express server
app.listen(PORT, () => {
	console.log(`server started at http://localhost:${PORT}`);
});
