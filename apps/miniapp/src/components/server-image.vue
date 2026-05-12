<script lang="ts" setup>
import { computed } from "vue";

type ImageMode =
    | "scaleToFill"
    | "aspectFit"
    | "aspectFill"
    | "widthFix"
    | "heightFix"
    | "top"
    | "bottom"
    | "center"
    | "left"
    | "right"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";

interface Props {
    url?: string | null;
    customClass?: string;
    mode?: ImageMode;
    fallback?: string;
    assetsPrefix?: string;
    lazyLoad?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    url: "",
    mode: "aspectFill",
    fallback: "",
    assetsPrefix: "/assets",
    lazyLoad: true
});

const imageUrl = computed(() => {
    return import.meta.env.VITE_SERVER_URL + props.url;
});
</script>

<template>
    <image :src="imageUrl" :mode="mode" :class="[props.customClass]" />
</template>
