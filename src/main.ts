import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "@mdi/font/css/materialdesignicons.css";
import "./style.css";

// Vuetify styles and components
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
	components,
	directives
});

// Pinia global state store
const pinia = createPinia();

const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.mount("#app");
