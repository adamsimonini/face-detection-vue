// Imports the Google Cloud client libraries

import * as vision from "@google-cloud/vision";
import * as fs from "fs";
import * as PImage from "pureimage";

// Creates a client
const client = new vision.ImageAnnotatorClient();

export async function detectFaces(inputFilePath: any) {
	if (fs.existsSync(inputFilePath)) {
		// Make a call to the Vision API to detect the faces
		const request = { image: { source: { filename: inputFilePath } } };
		const results = await client.faceDetection(request);
		const faces = results[0].faceAnnotations;
		if (faces) {
			const numFaces = faces.length;
			console.log(`Found ${numFaces} face${numFaces === 1 ? "" : "s"}.`);
			return faces;
		}
		return Error("No face found in image");
	} else {
		console.warn(`File at ${inputFilePath} doesn't exist`);
	}
}

async function getFaceHighlighting(inputFile: string, faces: any, outputFile: string, PImage: any) {
	// Open the original image
	const stream = fs.createReadStream(inputFile);
	let promise;
	if (inputFile.match(/\.jpg$/)) {
		promise = PImage.decodeJPEGFromStream(stream);
	} else if (inputFile.match(/\.png$/)) {
		promise = PImage.decodePNGFromStream(stream);
	} else {
		throw new Error(`Unknown filename extension ${inputFile}`);
	}
	const img = await promise;
	const context = img.getContext("2d");
	context.drawImage(img, 0, 0, img.width, img.height, 0, 0);

	// Now draw boxes around all the faces
	context.strokeStyle = "rgba(0,255,0,0.8)";
	context.lineWidth = "5";

	faces.forEach((face: any) => {
		context.beginPath();
		let origX = 0;
		let origY = 0;
		face.boundingPoly.vertices.forEach((bounds: any, i: number) => {
			if (i === 0) {
				origX = bounds.x;
				origY = bounds.y;
				context.moveTo(bounds.x, bounds.y);
			} else {
				context.lineTo(bounds.x, bounds.y);
			}
		});
		context.lineTo(origX, origY);
		context.stroke();
	});

	// Write the result to a file
	console.log(`Writing to file ${outputFile}`);
	const writeStream = fs.createWriteStream(outputFile);
	await PImage.encodePNGToStream(img, writeStream);
}

// var imageAsBase64 = fs.readFileSync("./assets/birthday.jpg", "base64");

export async function getHighlightedFile(inputFile: string, outputFile: string) {
	outputFile = `${outputFile}-highlighted.png` || "out.png";
	const faces = await detectFaces(inputFile);
	console.log("Highlighting...");
	await getFaceHighlighting(inputFile, faces, outputFile, PImage);
	console.log("Finished!");
}

// main("../assets/birthday.jpg", "birthday");
export default {};
