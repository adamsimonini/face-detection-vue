<script lang="ts">
export default {
	name: "image-uploader",
	data: () => ({
		image: null,
		rules: [
			(value: any) => {
				return !value || !value.length || value[0].size < 2000000 || "Avatar size should be less than 2 MB!";
			}
		]
	}),
	methods: {
		async selectImage(e: any) {
			const file = e;
			if (!file) return;
			const readData = (f: any) =>
				new Promise(resolve => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.readAsDataURL(f);
				});
			const data = await readData(file);
			this.image = data;
		},
		async clearImagePreview() {
			this.image = "";
		}
	}
};
</script>

<template>
	<v-col cols="12" sm="12">
		<v-file-input hint="my hint" density="comfortable" :rules="rules" show-size accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Upload photo here"></v-file-input>
		<div class="text-left">
			<strong>Restrictions</strong>
			<div class="ml-5">
				<ul>
					<li>must be under 2MB</li>
					<li>must be one of these file types: .png, .jpeg, or .bmp</li>
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
