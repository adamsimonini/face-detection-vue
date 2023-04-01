// Imports the Google Cloud client libraries

import * as vision from "@google-cloud/vision";
// const vision = require("@google-cloud/vision");

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Bucket where the file resides, e.g. my-bucket';
// const fileName = 'Path to file within bucket, e.g. path/to/image.png';

// Performs face detection on the gcs file
// const [result] = await client.faceDetection("./assets/birthday.jpg");
const [result] = await client.faceDetection("./assets/worried.jpg");
const faces = result.faceAnnotations;
console.log("Faces:");
if (faces) {
	faces.forEach((face: any, i: number) => {
		console.log(`  Face #${i + 1}:`);
		console.log(`    Joy: ${face.joyLikelihood}`);
		console.log(`    Anger: ${face.angerLikelihood}`);
		console.log(`    Sorrow: ${face.sorrowLikelihood}`);
		console.log(`    Surprise: ${face.surpriseLikelihood}`);
	});
}

export {};
