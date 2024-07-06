<template>
  <div>
    <NuxtLayout />
    <loader-bar />
  </div>
</template>

<script setup>
import { useStore } from "~~/store/store";
const store = useStore();
onMounted(() => {
  if (process.client) {
    store.token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
  }
});
</script>