import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import store from "./store";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
