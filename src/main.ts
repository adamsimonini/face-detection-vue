import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import TestImage from "./assets/test-images/christmas-party.jpg";
import * as FaceDetection from "./utiliites/faceDetection";

console.log("running");

createApp(App).mount("#app");
