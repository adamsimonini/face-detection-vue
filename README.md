# Face Detection App (Vue + TypeScript)

Instructions for this challenge can be found [here](./Instructions.pdf).

Game plan:

1. Initialize Vue with TypeScript app using Vite
2. Add [face-api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html) to project (free face-recognition app)
3. Add Vuetify (UI component framework)
4. Implement image uploading
5. Apply face detection to uploaded image and receive data
6. Containerize the application
7. Add face user data (e.g., admin)
8. Implement sessions via JTW

## Why face-api?

face-api.js loads the machine learning model directly onto the device. This is undesirable for many reasons: it's slow, it's demanding on resources, and I have to do more work as a developer. That said, the advantage is that the app isn't tied to a cloud service, where the free tier will eventually run out. If I want to add this to my portfolio, it will be a headache finding ways to support it for free after the free cloud services run out. Consequently, face-api is the way to go.

<hr/>

## Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
