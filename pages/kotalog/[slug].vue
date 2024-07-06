<template>
    <div>
      <div class="filtr">
        <div class="container">
          <div class="filtr-chang">
          <h1 class="filtr__title">{{ detail?.data?.category?.name }}</h1>
          <nav>
            <div class="filtr-cheng-icons" @click.prevent="view = 'shop'">
              <img src="@/assets/images/svg/grid.svg" alt="svg" />
            </div>
            <div class="filtr-cheng-icons" @click.prevent="view = 'service'">
              <img src="@/assets/images/svg/Vector.svg" alt="svg" />
            </div>
          </nav>
        </div>
          <div class="filtr-wrapper">
            <div class="filtr-wrapper-left">
              <section class="filre-wrapper-left-price">
                <p class="filre-wrapper-left-price__text">Цена (cум)</p>
                <div class="filre-wrapper-left-price-rang">
                  <nav>
                    <p>{{t("from")}} {{ sliderOneValue }}</p>
                  </nav>
                  <nav>
                    <p>{{t("to")}} {{ sliderTwoValue }}</p>
                  </nav>
                </div>

                <div class="slider-container">
                <input
                  type="range"
                  id="slider-1"
                  v-model="sliderOneValue"
                  @input="slideOne()"
                />
                <input
                  type="range"
                  id="slider-2"
                  v-model="sliderTwoValue"
                  @input="slideTwo()"
                />
                <div class="slider-track"></div>
              </div>
              
              </section>
  
              <div class="filtr-wrapper-left-items">
                <div class="filtr-wrapper-left-items-brands">
                  <section @click="store.brandopen = !store.brandopen">
                    <h1>{{ t("brand") }}</h1>
                    <img src="@/assets/images/svg/chevron-right.svg" alt="svg"  :class="{ 'rotaet': store.brandopen }" />
                  </section>
                  <nav v-if="store.brandopen">
                    <ul>
                      <li v-for="item in detail?.data?.brands" :key="item">
                        <input class="list-chekbox" type="checkbox" />
                        <p>{{ item?.name }}</p>
                      </li>
                    </ul>
                  </nav>
                </div>
  
                <div class="filtr-wrapper-left-items-items-part">
                  <section   v-for="(lit, i) in detail?.data?.characters"
                  :key="lit">
                    <div class="filtr-chevron-part" @click="toggleopen(i)">
                      <h1>{{ lit?.characterName }}</h1>
                      <img class="filtr-chevron-part-img"
                        src="@/assets/images/svg/chevron-right.svg"
                        alt="svg"
                      />
                    </div>
                    <nav class="filtr-nav">
                      <ul>
                        <li
                          v-for="filt in lit?.assigns"
                          :key="filt"
                        >
                          <input class="list-chekbox" type="checkbox" />
                          <p>{{ filt?.value }}</p>
                        </li>
                      </ul>
                    </nav>
                  </section>
                </div>
              </div>
            </div>
  
            <div class="filtr-wrapper-right">
              <div class="filtr-wrapper-right-item"  :class="view">
                <product-card
                  v-for="item in detail?.data?.products?.items"
                  :key="item"
                  :product="item"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import service from "~/services/service";
  import { useStore } from "~~/store/store";
  const store = useStore();
  const headerkatalog = ref({});
  const detail = ref({});
  let view = ref('shop');
  const {locale, t} = useI18n()

  function toggleopen(i) {
  document.querySelectorAll(".filtr-nav").forEach((el, index) => {
    if (i == index) {
      el.classList.toggle("open");
    } else {
      el.classList.remove("open");
    }
  });
  document.querySelectorAll(".filtr-chevron-part-img").forEach((el, index) => {
    if (i == index) {
      el.classList.toggle("rotaet");
    } else {
      el.classList.remove("rotaet");
    }
  });
}




  const { slug } = useRoute().params;
  
  async function getCategoryDetail() {
    const res = await service.getCategoryDetail(slug, store.token, locale.value);
    detail.value = res;
  }
  getCategoryDetail();


  
const sliderOneValue = ref(0);
const sliderTwoValue = ref(100);
const minGap = 0;
const sliderMaxValue = ref(100);

const slideOne = () => {
  if (
    parseInt(sliderTwoValue.value) - parseInt(sliderOneValue.value) <=
    minGap
  ) {
    sliderOneValue.value = parseInt(sliderTwoValue.value) - minGap;
  }
  fillColor();
};

const slideTwo = () => {
  if (
    parseInt(sliderTwoValue.value) - parseInt(sliderOneValue.value) <=
    minGap
  ) {
    sliderTwoValue.value = parseInt(sliderOneValue.value) + minGap;
  }
  fillColor();
};

const fillColor = () => {
  const sliderTrack = document.querySelector(".slider-track");
  const percent1 = (sliderOneValue.value / sliderMaxValue.value) * 100;
  const percent2 = (sliderTwoValue.value / sliderMaxValue.value) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
};

onMounted(() => {
  fillColor();
});
  </script>
  
  <style lang="scss" scoped>
  </style>