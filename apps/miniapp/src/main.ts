import { createSSRApp } from "vue";
import App from "./App.vue";
import "uno.css";
import "@tdesign/uniapp/theme.css";

export function createApp() {
    const app = createSSRApp(App);
    return {
        app
    };
}
