import { createApp } from "vue";
import App from "./App.vue";
import { Tooltip } from "./directives/tooltip";
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

const app = createApp(App);
app.use(createPinia());
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
app.directive('tooltip', Tooltip);
app.mount("#app");
