import { createApp } from "vue";
import App from "./App.vue";
import { Tooltip } from "./directives/tooltip";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.directive('tooltip', Tooltip);
app.mount("#app");
