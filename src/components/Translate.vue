<template>
  <div id="google_translate_element"></div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

function loadGoogleTranslate() {
  if (!document.querySelector("#google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.type = "text/javascript";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  } else {
    googleTranslateElementInit(); // Reinitialize if script is already loaded
  }
}

window.googleTranslateElementInit = function () {
  new google.translate.TranslateElement(
    { pageLanguage: "en", autoDisplay: false },
    "google_translate_element"
  );
};

onMounted(() => {
  loadGoogleTranslate();
});

// Reload translate widget on route change
watch(route, () => {
  setTimeout(() => {
    googleTranslateElementInit();
  }, 500);
});
</script>

<style>
.goog-te-banner-frame {
  display: none !important;
}
.goog-te-gadget {
  font-size: 14px;
  color: #333;
}
</style>
