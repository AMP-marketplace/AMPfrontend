<template>
    <div class="text-center">
      <h2 class="font-semibold text-lg">{{ title }}</h2>
      <p class="text-sm">{{ subtitle }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    subtitle: String,
  });
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  .font-semibold {
    font-weight: 600;
  }
  .text-lg {
    font-size: 1.25rem;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  </style>
  