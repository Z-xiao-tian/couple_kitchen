import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UnoCSS from "unocss/vite";
import { resolve } from "node:path";

const envDir = resolve(__dirname, "environments");

// https://vitejs.dev/config/
export default defineConfig(async () => {
    return {
        envDir: envDir,
        plugins: [UnoCSS(), uni()]
    };
});
