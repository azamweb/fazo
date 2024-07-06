<template>
  <div>
    <div class="about-cards">
      <div class="container about-container">
        <div class="about-cards-left">
          <div class="about-cards-left-photos">

            <div class="about-cards-left-photos-bootom" >
              <swiper style="width: 280px;"
                :spaceBetween="10"
                :thumbs="{ swiper: thumbsSwiper }"
                :modules="[SwiperThumbs, SwiperFreeMode]"
                class="mySwiper2"
              >
                <swiper-slide class="about-cards-swiper-slide" style="width: fit-content !important;"
                  v-for="item in detail.data?.product?.images"
                  :key="item"
                >
                  <img style="width: 280px; height: 280px" :src="item" alt=""
                /></swiper-slide>
              </swiper>
              <swiper style="width: 280px;"
                @swiper="setThumbsSwiper"
                :spaceBetween="10"
                :slidesPerView="4"
                :freeMode="true"
                :watchSlidesProgress="true"
                :modules="[SwiperThumbs, SwiperFreeMode]"
                class="mySwiper"
              >
                <swiper-slide class="about-cards-swiper-slide" style="width: fit-content !important;"
                  v-for="item in detail.data?.product?.images"
                  :key="item"
                >
                  <img style="width: 79px; height: 79px" :src="item" alt=""
                /></swiper-slide>
              </swiper>
            </div>
          </div>

          <div class="about-cards-left-part">
            <h1>{{ detail.data?.product?.name }}</h1>
            <div class="about-cards-left-part-items">
              <div class="about-cards-left-part-items-prices">
                <h4>{{ detail.data?.product?.priceFormat }}</h4>
                <p>sotuvda:{{ detail.data?.product?.residue_store }}</p>
              </div>
              <div class="about-cards-left-part-items-logos">
                <img src="@/assets/images/svg/svg.svg" alt="heard" />
                <img src="@/assets/images/svg/button.svg" alt="scales" />
                <img src="@/assets/images/svg/bag.svg" alt="basket" />
              </div>
            </div>
            <button class="about-cards-left-part-button">
              hozir sotib olish
            </button>
            <section>
              <p>{{ detail.data?.product?.description }}</p>
            </section>
          </div>
        </div>

        <div class="about-cards-right">
          <div class="about-cards-right-item">
            <div class="about-cards-right-item-quation">
              <img src="@/assets/images/svg/suporte.svg" alt="" />
              <h3>Savollar Bormi?</h3>
            </div>
            <nav>
              <ul class="right-item-list">
                <li>
                  <p>Телефон:</p>
                  <NuxtLink
                    class="right-item-list-link"
                    target="blank"
                    to="/"
                    >{{ about?.data?.call_center_phone }}</NuxtLink
                  >
                </li>
                <li>
                  <p>Телеграм:</p>
                  <NuxtLink
                    class="right-item-list-link"
                    target="blank"
                    :to="about?.data?.telegram_url"
                    >@mtdmarketplace</NuxtLink
                  >
                </li>
              </ul>
            </nav>
          </div>
          <div class="about-cards-right-item">
            <div class="about-cards-right-item-quation">
              <img src="@/assets/images/svg/Group 4021.svg" alt="" />
              <h3>To'lov Usullari:</h3>
            </div>
            <nav>
              <ul>
                <li>
                  <p>To'lov Usullari:</p>
                </li>
                <li>
                  <p>Naqd Pul Orqali To'lash</p>
                </li>
                <li>
                  <p>Orqali To'lash Payme</p>
                </li>
                <li>
                  <p>Qabul Qilganda Naqt Pul Orqali To'lash</p>
                </li>
                <li>
                  <p>Qabul Qilganda Karta Orqali To'lash</p>
                </li>
                <li>
                  <p>Karta Orqali To'lash</p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store";
import service from "~/services/service";
const { slug } = useRoute().params;
const detail = ref({});
const about = ref({});
const {locale, t} = useI18n()
const store = useStore()
async function getDetail() {
  const res = await service.getProductDetail(slug, store.token, locale.value);
  detail.value = res;
}
async function getabout() {
  const res = await service.getabout(store.token,locale.value);
  about.value = res;
}
getDetail();
getabout();
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>

<style lang="scss" scoped>
</style>