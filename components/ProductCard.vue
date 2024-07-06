<template>
  <div class="main-prodakts-card-item">
    <div class="main-prodakts-card-item-part">
      <img
        class="main-prodakts-card-item-part__img"
        :src="props.product?.imageUrl"
        alt="scales"
      />
    </div>
    <NuxtLink class="h3-title" :to="localePath(`/detail/${props.product?.slug}`)">
      {{ props.product?.name }}
    </NuxtLink>
  
    <section class="main-prodakts-card-item-bottom">
      <div class="main-prodakts-card-item-bottom-part">
        <p class="main-prodakts-card-item-bottom-part__text">10990$</p>
        <p class="main-prodakts-card-item-bottom-part__text">
          {{ props.product?.priceFormat }}
        </p>
      </div>
      <div class="main-products-cards-item-bootom-section">

        <div
        :class="{ 'chang-color-two': activesave }"
          class="main-prodakts-card-item-bottom-part-put"
          @click="saveCard(item)"
        >
          <img
            class="main-prodakts-card-item-bottom-part-put__img"
            src="../assets/images/svg/svg.svg"
            alt="heard"
          />
        </div>
        <div

          class="main-prodakts-card-item-bottom-part-put"
       
        >
        <img
        class="main-prodakts-card-item-bottom-part-put__img"
        src="../assets/images/svg/button.svg"
        alt="scales"
      />
        </div>
        <div
          :class="{ 'chang-color': activeCard }"
          class="main-prodakts-card-item-bottom-part-put"
          @click="addToCart(item)"
        >
          <img
            class="main-prodakts-card-item-bottom-part-put__img"
            src="../assets/images/svg/bag.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { addToCart } from "~/composables/addToCart";
import { useStore } from "~/store/store";

const localePath = useLocalePath()

const store = useStore();
const props = defineProps(["product"]);
const item = ref({
  id: props.product?.id,
  title: props.product?.name,
  price: props.product?.priceFormat,
  image: props.product?.imageUrl,
  quantity: 1,
});
const activeCard = computed(() => {
  const product = store.cart.find((el) => el.id == item.value?.id);
  if (product) {
    return true;
  } else {
    return false;
  }
});
const activesave = computed(() => {
  const product = store.save.find((el) => el.id == item.value?.id);
  if (product) {
    return true;
  } else {
    return false;
  }
});
// const activesave = computed(() => {
//   const product = store.cart.find((el) => el.id == item.value.id);
//   if (product) {
//     return true;
//   } else {
//     return false;
//   }
// });
</script>

<style scoped></style>
