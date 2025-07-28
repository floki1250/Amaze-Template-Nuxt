<template>
  <div class="h-full p-4 pl-8 flex flex-col gap-4 justify-center items-start">
    <div
      class="flex gap-4 bg-base-100/80 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl border border-base-100"
    >
      <button class="btn btn-primary w-24" @click="start()">start</button>
      <button class="btn btn-warning w-24" @click="finish()">finish</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { start, finish } = useLoadingIndicator();
definePageMeta({
  title: "Home",
  middleware: "auth",
});
</script>
