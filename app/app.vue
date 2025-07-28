<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { themeChange } from "theme-change";

onMounted(() => {
  themeChange(false);
});
</script>
