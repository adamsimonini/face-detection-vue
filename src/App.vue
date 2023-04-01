<script lang="ts">
import { defineComponent } from "vue";
import TopBar from "./components/TopBar.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
	data: () => ({
		rules: [
			(value: any) => {
				return !value || !value.length || value[0].size < 2000000 || "Avatar size should be less than 2 MB!";
			}
		]
	}),
	components: { HelloWorld, TopBar }
};
</script>

<template>
	<v-container class="">
		<TopBar />
		<v-row no-gutters>
			<v-col cols="12" sm="12">
				<v-file-input :rules="rules" show-size accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Upload photo here"></v-file-input>
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
			<v-col v-for="n in 3" :key="n" cols="12" sm="4">
				<v-sheet class="ma-2 pa-2"> One of three columns </v-sheet>
			</v-col>
		</v-row>
	</v-container>
	<!-- <img src="@assets/birthday.jpg" /> -->
</template>

<style scoped></style>
