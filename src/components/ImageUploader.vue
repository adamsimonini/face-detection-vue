<script lang="ts">
import { detectFaces, getHighlightedFile } from "@utilities/imageDetection";

export default {
	name: "image-uploader",
	data: () => ({
		image: undefined,
		imageData: undefined,
		loading: false,
		rules: [
			(value: any) => {
				return !value || !value.length || value[0].size < 2000000 || "Avatar size should be less than 2 MB!";
			}
		]
	}),
	methods: {
		test(e: any) {
			console.log(e.target.files[0]);
		},
		importImage(e: any) {
			this.loading = true;
			const file = e.target.files[0];
			// ensure there is actually a file that has been uploaded, and that it is of type image
			if (!file || !file.type.match("image.*")) {
				this.loading = false;
				return;
			}
			// Use the javascript reader object to load the image contents
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.imageData = reader.result;
				console.log(this.imageData);
				this.loading = false;
				// TODO: build an API route for this process to be done on the backend
				// getHighlightedFile(this.imageData);
			};
		}

		// async selectImage(e: any) {
		// 	const file = e;
		// 	if (!file) return;
		// 	const readData = (f: any) =>
		// 		new Promise(resolve => {
		// 			const reader = new FileReader();
		// 			reader.onloadend = () => resolve(reader.result);
		// 			reader.readAsDataURL(f);
		// 		});
		// 	const data = await readData(file);
		// 	this.image = data;

		// 	console.log(this.image);
		// },
		// async clearImagePreview() {
		// 	this.image = "";
		// }
	}
};
</script>

<template>
	<v-col cols="12" sm="12">
		<v-file-input v-model="image" @change="importImage" hint="my hint" :loading="loading" density="comfortable" :rules="rules" show-size accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" label="Upload photo here"></v-file-input>
		<div class="text-left">
			<strong>Restrictions</strong>
			<div class="ml-5">
				<ul>
					<li>photo must be under 2MB</li>
					<li>photo must be one of these file types: .png, .jpeg, or .bmp</li>
				</ul>
			</div>
		</div>
	</v-col>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
