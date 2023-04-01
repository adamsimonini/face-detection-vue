import vision from "@google-cloud/vision";

async function quickstart() {
	// Imports the Google Cloud client library

	// Creates a client
	const client = new vision.ImageAnnotatorClient();

	// Performs label detection on the image file
	const [result] = await client.labelDetection("./assets/birthday.jpg");
	const labels = result.labelAnnotations;
	console.log("Labels:");
	if (labels) {
		labels.forEach((label: any) => console.log(label.description));
	}
}
quickstart();

export {};
