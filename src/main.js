import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Storage, { StorageType } from "vue3-storage";

import "./assets/main.css";

const app = createApp(App);

app.use(Vue3Storage, { namespace: "pro_", storage: StorageType.Local });
app.use(router);

app.mount('#app');
