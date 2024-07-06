<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header-hero">
          <Swiper
            class="hero-swiper"
            :modules="[SwiperNavigation, SwiperPagination, SwiperAutoplay]"
            :loop="true"
            :navigation="{
              prevEl: '.hero-prev-btn',
              nextEl: '.hero-next-btn',
            }"
            :autoplay="{
              delay: 4000,
              disableOnInteraction: true,
            }"
            :pagination="{
              dynamicBullets: true,
            }"
          >
            <SwiperSlide
              class="hero-swiper-slide"
              v-for="item in banner?.data"
              :key="item"
            >
              <img :src="item.imageUrl" alt="" />
            </SwiperSlide>
          </Swiper>
          <button class="hero-prev-btn">
            <img src="../assets/images/svg/prev.svg" alt="prev" />
          </button>
          <button class="hero-next-btn">
            <img src="../assets/images/svg/next.svg" alt="next" />
          </button>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="main-prodakts">
        <div class="container">
          <h1>{{ t("allProducts") }}</h1>

          <Swiper
            class="prodacts-swiper"
            :modules="[SwiperNavigation]"
            :navigation="{
              prevEl: '.products__prev-btn',
              nextEl: '.products__next-btn',
            }"
            :slides-per-view="'auto'"
            :space-between="14"
          >
            <SwiperSlide class="prodacts-swiper-slide" v-for="item in products.data" :key="item">
              <product-card :product="item" />
            </SwiperSlide>
          </Swiper>
          <button class="products__prev-btn">
            <img src="../assets/images/svg/prev.svg" alt="prev" />
          </button>
          <button class="products__next-btn">
            <img src="../assets/images/svg/next.svg" alt="next" />
          </button>
        </div>
      </div>

      <div class="popular-prodacts">
        <div class="container">
          <h1>{{ t("popularproducts") }}</h1>

          <Swiper
            class="popular-swiper"
            :modules="[SwiperNavigation]"
            :navigation="{
              prevEl: '.popular-prev-btn',
              nextEl: '.popular-next-btn',
            }"
            :slides-per-view="'auto'"
            :space-between="14"
          >
            >
            <SwiperSlide
              class="popular-swiper-slide"
              v-for="item in popular?.data"
              :key="item"
            >
              <famous-card :famouse="item"/>
            </SwiperSlide>
          </Swiper>
          <button class="popular-prev-btn">
            <img src="../assets/images/svg/prev.svg" alt="prev" />
          </button>
          <button class="popular-next-btn">
            <img src="../assets/images/svg/next.svg" alt="next" />
          </button>
        </div>
      </div>

      <div class="main-advertaise">
        <div class="container">
          <Swiper class="advertaise-swiper"
          :modules="[SwiperNavigation,SwiperAutoplay]"
            :navigation="{
              prevEl: '.cheaper-prev-btn',
              nextEl: '.cheaper-next-btn',
            }"
            :autoplay="{
              delay: 4000,
              disableOnInteraction: true,
            }"
          >
            <SwiperSlide
              class="advertaise-swiper-slide"
              v-for="item in cheaper?.data"
              :key="item"
            >
              <div class="advertaise-swiper-slide-left">
                <h2>{{ item?.title }}</h2>
                <p>{{ item?.description }}</p>
              </div>
              <img :src="item?.imageUrl" alt="" />
              <div class="advertaise-swiper-slide-right">
                <h2 class="advertaise-swiper-slide-right__title">
                  {{ item?.price }}
                </h2>
                <p class="advertaise-swiper-slide-right__text">
                  {{ item?.old_price }}
                </p>
                <NuxtLink class="advertaise-swiper-slide-link" :to="`/detail/${item?.product?.slug}`">
                  {{ item?.button_label }}
                </NuxtLink>
              </div>
            </SwiperSlide>
          </Swiper>
          <button class="cheaper-prev-btn">
            <img src="../assets/images/svg/prev.svg" alt="prev" />
          </button>
          <button class="cheaper-next-btn">
            <img src="../assets/images/svg/next.svg" alt="next" />
          </button>
        </div>
      </div>

      <div class="cheaper-products">
        <div class="container">
          <h2>{{ t("cheaprproducts") }}</h2>
          <div class="cheaper-products-cards">
            <product-card v-for="item in cheaperproduct?.data" :key="item" :product="item"/>
          </div>
        </div>
      </div>

      <div class="brands">
        <div class="container">
          <div class="brands-cards">
            <h1>{{ t("brand") }}</h1>
            <Swiper class="brands-swiper"
            :modules="[SwiperNavigation]"
            :navigation="{
              prevEl: '.brands-prev-btn',
              nextEl: '.brands-next-btn',
            }"
            :slides-per-view="'auto'"
            :space-between="25"
            >
              <SwiperSlide class="brands-swiper-slide" v-for="item in brands?.data" :key="item">
                <div class="brats-cards-item">
                  <img :src="item?.imageUrl" alt="">
                </div>
              </SwiperSlide>
            </Swiper>
            <button class="brands-prev-btn">
            <img src="../assets/images/svg/prev.svg" alt="prev" />
          </button>
          <button class="brands-next-btn">
            <img src="../assets/images/svg/next.svg" alt="next" />
          </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import service from "~/services/service";
import { useStore } from "~/store/store";
const store = useStore();
const {locale, t} = useI18n()
const products = ref({});
const banner = ref({});
const popular = ref({});
const cheaper = ref({});
const cheaperproduct = ref({});
const brands = ref({}); 

async function getProducts() {
  const res = await service.getAllProducts(store.token, locale.value);
  products.value = res;
}
async function getBanner() {
  const res = await service.getBanners(store.token,);
  banner.value = res;
}
async function getPopularcards() {
  const res = await service.getPopularcards(store.token, locale.value);
  popular.value = res;
}
async function getcheaper() {
  const res = await service.getcheaper(store.token,locale.value);
  cheaper.value = res;
}
async function getcheaperproducts() {
  const res = await service.getcheaperproducts(store.token, locale.value);
  cheaperproduct.value = res;
}
async function getbrands() {
  const res = await service.getbrands(store.token, locale.value);
  brands.value = res;
}
getProducts();
getBanner();
getPopularcards();
getcheaper();
getcheaperproducts();
getbrands();
</script>

<style lang="scss" scoped>
</style>