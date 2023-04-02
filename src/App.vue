<script lang="ts">
import { defineComponent } from "vue";
import TopBar from "./components/TopBar.vue";
import ImageUploader from "./components/ImageUploader.vue";

export default {
	name: "app",
	components: { ImageUploader, TopBar }
};
</script>

<template>
	<v-container class="">
		<TopBar />
		<v-row no-gutters>
			<ImageUploader />
			<v-col v-for="n in 3" :key="n" cols="12" sm="4">
				<v-sheet class="ma-2 pa-2"> One of three columns </v-sheet>
			</v-col>
		</v-row>
	</v-container>
	<!-- <img src="@assets/birthday.jpg" /> -->
</template>

<style scoped></style>
