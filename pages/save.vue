<template>
    <div>
        <div class="save">
    <div class="container">
      <div class="defoult-item" v-if="!store.save?.length">
        <h1 class="default-page">
          {{ t("save") }}
        </h1>
        <img class="defoult-img" src="../assets/images/png/dontknow.jpg" alt="one boy">
      </div>
      <div class="save-products" v-else>
        <div class="save-cards" v-for="(item,i) in store.save" :key="item">
          <img class="save-cards__img" :src="item?.image" alt="images" />
         <NuxtLink class="save-cards__link" to="/">{{ item?.title }}</NuxtLink>
        <div class="save-card-part">
            <h3 class="save-card-part__price">{{ item?.price }}$</h3>
            <div class="save-card-part-put" @click="deleteItem(i)"  :class="{ 'chang-color-two': activesave }">
        <img

          class="save-card-part-put__img"
          src="../assets/images/svg/heard.svg"
          alt="heard"
        />
      </div>
        </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script setup>
import { useStore } from "~/store/store";
const store = useStore();
const {locale, t} = useI18n()
function deleteItem(i) {
  store.save.splice(i, 1);
  localStorage.setItem("save", JSON.stringify(store.save));
}

</script>

<style lang="scss" scoped>

</style>