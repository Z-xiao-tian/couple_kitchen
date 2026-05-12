import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/.vscode/**",
            "**/.idea/**",
            "**/build/**",
            "**/coverage/**",
            "**/.git/**",
            // 忽略uni_modules目录
            "**/uni_modules/",
            // 忽略原生插件目录
            "**/nativeplugins/",
            "dist",
            // unplugin-auto-import 生成的类型文件，每次提交都改变，所以加入这里吧，与 .gitignore 配合使用
            "auto-import.d.ts",
            // vite-plugin-uni-pages 生成的类型文件，每次切换分支都一堆不同的，所以直接 .gitignore
            "uni-pages.d.ts",
            // 插件生成的文件
            "src/pages.json",
            "src/manifest.json",
            // 忽略自动生成文件
            "src/service/**"
        ]
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser }
    },
    {
        files: ["electron/**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: globals.node
        }
    },
    tseslint.configs.recommended,
    {
        files: ["**/*.{ts,mts,cts,tsx,vue}"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off"
        }
    },
    pluginVue.configs["flat/essential"],
    {
        files: ["**/*.vue"],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser
            }
        },
        rules: {
            // 关闭组件名必须为多单词规则
            "vue/multi-word-component-names": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "vue/valid-v-slot": "off"
        }
    },
    {
        files: ["apps/miniapp/**/*.{ts,vue,js}"],
        languageOptions: {
            globals: {
                uni: "readonly",
                wx: "readonly",
                getCurrentPages: "readonly",
                UniApp: "readonly",
                WechatMiniprogram: "readonly"
            }
        }
    },
    eslintPluginPrettierRecommended
]);
