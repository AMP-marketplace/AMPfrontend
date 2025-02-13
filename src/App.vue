<template>
  <router-view />
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, watch } from "vue";

const router = useRouter();

onMounted(() => {
  trackPageView(router.currentRoute.value.fullPath);
});

watch(
  () => router.currentRoute.value.fullPath,
  (newPath) => {
    trackPageView(newPath);
  }
);

function trackPageView(path) {
  if (window.omnisend) {
    console.log("Tracking page view:", path);
    window.omnisend.push(["track", "$pageViewed"]);
  }
}
</script>
