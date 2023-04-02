<script lang="ts">
export default {
	name: "image-uploader",
	data: () => ({
		image: undefined,
		imageName: "test",
		imageBase64: undefined,
		loading: false,
		imageRules: [
			(value: any) => {
				return !value || !value.length || value[0].size < 2000000 || "Image size should be less than 2 MB!";
			}
		],
		nameRules: [
			(value: any) => {
				return !value || !value.length || value[0].length < 81 || "80 characters is the max length for this field";
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
		},
		sendImageDataToExpress() {
			// ensure that both an image and image name have been provided
			// if (!this.image || !this.imageName) return false;
			this.axios
				.get("http://localhost:5050/helloworld", {
					params: {
						name: this.imageName
					}
				})
				.then(response => {
					console.log(response.data);
				});
		}
	}
};
</script>

<template>
	<v-sheet max-width="" class="d-flex align-start flex-column">
		<v-row no-gutters class="d-flex align-center flex-row w-100">
			<v-col cols="6" sm="6" class="w-100">
				<v-file-input class="image-input" v-model="image" @change="importImage" hint="my hint" :loading="loading" density="comfortable" :rules="imageRules" show-size accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" label="Upload photo here"></v-file-input>
			</v-col>
			<v-col cols="3" sm="3">
				<v-text-field v-model="imageName" class="ml-5 image-input" label="Photo Name" :rules="nameRules" hide-details="auto"></v-text-field>
			</v-col>
			<v-col cols="3" sm="3">
				<v-btn @click="sendImageDataToExpress" class="ml-5 image-input" block rounded="lsm" size="large" color="indigo-darken-3">Detect Faces</v-btn>
			</v-col>
		</v-row>
		<v-row no-gutters justify="start" class="ml-10">
			<div class="text-left">
				<strong>Restrictions</strong>
				<div class="ml-5">
					<ul>
						<li>photo must be under 2MB</li>
						<li>photo must be one of these file types: .png, .jpeg, or .bmp</li>
					</ul>
				</div>
			</div>
		</v-row>
	</v-sheet>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
