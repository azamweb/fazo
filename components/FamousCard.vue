<template>
  <div>
    <div class="popular-prodacts-cards">
      <h3 class="popular-prodacts-cards__title">{{ props.famouse.name }}</h3>
      <img
        class="popular-prodacts-cards__img"
        :src="props.famouse.imageUrl"
        alt="png"
      />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
const store = useStore();
const props = defineProps(["famouse"]);
</script>

<style lang="scss" scoped>
</style>