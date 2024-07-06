<template>
  <div class="basket">
    <div class="container">
    
      <div class="defoult-item" v-if="!store.cart?.length">
        <h1 class="default-page">
          {{ t("add") }}
        </h1>
        <img
          class="defoult-img"
          src="../assets/images/png/dontknow.jpg"
          alt="one boy"
        />
      </div>
      <div class="basket-products" v-else>
        <div class="basket-cards" v-for="(item, i) in store.cart" :key="item">
          <img class="basket-cards__img" :src="item?.image" alt="images" />
          <div class="basket-cards-item">
            <h1>{{ item?.title }}</h1>
            <section>
              <img
                @click="remQuantity(item)"
                class="basket-cards-item-section-img"
                src="../assets/images/svg/minus.svg"
                alt="minus"
              />
              <p>{{ item?.quantity }}</p>
              <img
                class="basket-cards-item-section-img"
                src="../assets/images/svg/plus.svg"
                alt="plus"
                @click="addQuantity(item)"
              />
            </section>
            <h4 class="text">{{ item?.price }}</h4>
          </div>
          <div class="basket-cards-item-end">
            <button>
              <NuxtLink class="link" to="/">by</NuxtLink>
            </button>
            <img
              @click="deleteItem(i)"
              src="../assets/images/svg/remove.svg"
              alt="delet"
            />
          </div>
        </div>
        <div class="baket-bottom">
            <h3 class="basket-bottom-all-price"></h3>
            <div class="basket-bottom-buttons">
              <NuxtLink to="/" class="basket-bottom-buttons__btn">
                Продолжить покупки
              </NuxtLink>
              <NuxtLink to="/" class="basket-bottom-buttons__btn">
                Оформить покупку
              </NuxtLink>
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

const valueitem = ref()

function addQuantity(item) {
  const product = store.cart.find((el) => el == item);
  if (product.quantity < 5) {
    product.quantity += 1;
  } else {
    alert("you can only add 5 products");
  }
  localStorage.setItem("cart", JSON.stringify(store.cart));
}
function remQuantity(item) {
  const product = store.cart.find((el) => el == item);
  if (product.quantity > 1) {
    product.quantity -= 1;
  }
  localStorage.setItem("cart", JSON.stringify(store.cart));
}
function deleteItem(i) {
  store.cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(store.cart));
}


</script>

<style lang="scss" scoped></style>
