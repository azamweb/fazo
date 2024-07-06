<template>
  <header class="header">
    <div class="header-top">
      <div class="container header-container">
        <div
          class="header-top-media-modal"
          @click="(store.navbar = !store.navbar), (store.over = true)"
        >
          <img src="../assets/images/svg/mediaopen.svg" alt="mediaopen" />
        </div>

        <NuxtLink
          to="https://www.google.com/maps"
          target="blank"
          class="header-top-icons"
          style="text-decoration: none"
        >
          <img
            src="../assets/images/svg/map-pin.svg"
            alt=""
            class="header-top-icons__img"
          />
          <p class="header-top-icons__text">Ташкент</p>
        </NuxtLink>
        <p class="header-top__text">+998 (90) 632-59-14</p>

        <div class="header-top-language">
          <section @click="store.language = !store.language">
            <p>{{ locale }}</p>
            <div class="chevron-img" :class="{ rotate: store.language }">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.26318 18L15.2663 12L9.26318 6"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </section>

          <transition name="lang">
            <ul v-if="store.language">
              <li
                @click="store.language = false"
                v-for="{ code, name } in locales"
                :key="code"
              >
                <NuxtLink class="lang-link" :to="switchLocalePath(code)">{{
                  name
                }}</NuxtLink>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>

    <div class="header-midle">
      <div class="container midle-container">
        <NuxtLink class="big-title" to="/">
          <img
            class="header-modle-img"
            src="../assets/images/svg/Frame.svg"
            alt=""
          />
        </NuxtLink>

        <form
          class="header-midle-search"
        >
          <input
            class="midle-input"
            type="text"
            placeholder="Искать..."
            @input="updateSearchItems($event)"
          />
          <section class="midle-img">
            <img src="../assets/images/svg/serch.svg" alt="search" />
          </section>
        </form>

        <div
          class="header-serach-modal"
          v-if="searchItems?.items || searchItems?.items?.length"
        >
          <ul>
            <li
              v-for="item in searchItems?.items"
              :key="item"
              @click="(searchItems = false), clearSearch()"
            >
              <img :src="item?.imageUrl" alt="img" />
              <NuxtLink
                class="search-modal-link"
                :to="localePath(`/detail/${item.slug}`)"
                >{{ item?.name }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="header-midle-items">
          <NuxtLink class="header-midle-items-icon" to="/">
            <section>0</section>
            <img src="../assets/images/svg/scales.svg" alt="scales" />
          </NuxtLink>
          <NuxtLink class="header-midle-items-icon" to="/save">
            <section>{{ saveLength }}</section>
            <img src="../assets/images/svg/heard.svg" alt="heard" />
          </NuxtLink>
          <NuxtLink class="header-midle-items-icon" to="/basket">
            <section>{{ cartLength }}</section>
            <img src="../assets/images/svg/bagej.svg" alt="bagej" />
          </NuxtLink>
          <button
            v-if="!store.token"
            class="header-midle-items-icon"
            @click="store.contactopen = !store.contactopen"
          >
            <img src="../assets/images/svg/pagej.svg" alt="pagej" />
          </button>
          <NuxtLink v-else class="header-midle-items-icon" to="/profil">
            <img src="../assets/images/svg/pagej.svg" alt="pagej" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div class="cotalog" v-if="openCotalog">
        <div class="container">
          <div class="cotalog-header">
            <h2>Kotalog</h2>
            <button @click="(openCotalog = !openCotalog), (overlay = false)">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <ul class="cotalog-menu">
            <div class="cotalog-wrapper">
              <li
                @click="addClass"
                class="cotalog-wrapper__item"
                v-for="item in headerkatalog?.data"
                :key="item"
              >
                <span>
                  <img :src="item?.iconUrl" alt="" />
                  {{ item?.name }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                  >
                    <path
                      d="M7.13911 14.7892C7.04041 14.7898 6.94256 14.7709 6.85118 14.7335C6.75981 14.6962 6.67669 14.6412 6.60661 14.5717C6.53632 14.502 6.48052 14.419 6.44245 14.3276C6.40437 14.2362 6.38477 14.1382 6.38477 14.0392C6.38477 13.9402 6.40437 13.8422 6.44245 13.7508C6.48052 13.6594 6.53632 13.5764 6.60661 13.5067L10.5816 9.5392L6.60661 5.5717C6.53669 5.50177 6.48121 5.41876 6.44337 5.32739C6.40552 5.23602 6.38605 5.1381 6.38605 5.0392C6.38605 4.94031 6.40552 4.84238 6.44337 4.75101C6.48121 4.65965 6.53669 4.57663 6.60661 4.5067C6.67654 4.43677 6.75956 4.3813 6.85093 4.34346C6.94229 4.30561 7.04022 4.28613 7.13911 4.28613C7.23801 4.28613 7.33593 4.30561 7.4273 4.34346C7.51867 4.3813 7.60168 4.43677 7.67161 4.5067L12.1716 9.0067C12.2419 9.07642 12.2977 9.15938 12.3358 9.25077C12.3739 9.34216 12.3935 9.44019 12.3935 9.5392C12.3935 9.63821 12.3739 9.73624 12.3358 9.82763C12.2977 9.91903 12.2419 10.002 12.1716 10.0717L7.67161 14.5717C7.60153 14.6412 7.51842 14.6962 7.42704 14.7335C7.33567 14.7709 7.23782 14.7898 7.13911 14.7892Z"
                      fill="#BABAC0"
                    ></path>
                  </svg>
                </span>
                <ul class="cotalog-wrapper__sub-menu">
                  <div class="cotalog-wrapper__sub-menu-wrapper">
                    <button @click="backCotalog()">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                      >
                        <path
                          d="M7.13911 14.7892C7.04041 14.7898 6.94256 14.7709 6.85118 14.7335C6.75981 14.6962 6.67669 14.6412 6.60661 14.5717C6.53632 14.502 6.48052 14.419 6.44245 14.3276C6.40437 14.2362 6.38477 14.1382 6.38477 14.0392C6.38477 13.9402 6.40437 13.8422 6.44245 13.7508C6.48052 13.6594 6.53632 13.5764 6.60661 13.5067L10.5816 9.5392L6.60661 5.5717C6.53669 5.50177 6.48121 5.41876 6.44337 5.32739C6.40552 5.23602 6.38605 5.1381 6.38605 5.0392C6.38605 4.94031 6.40552 4.84238 6.44337 4.75101C6.48121 4.65965 6.53669 4.57663 6.60661 4.5067C6.67654 4.43677 6.75956 4.3813 6.85093 4.34346C6.94229 4.30561 7.04022 4.28613 7.13911 4.28613C7.23801 4.28613 7.33593 4.30561 7.4273 4.34346C7.51867 4.3813 7.60168 4.43677 7.67161 4.5067L12.1716 9.0067C12.2419 9.07642 12.2977 9.15938 12.3358 9.25077C12.3739 9.34216 12.3935 9.44019 12.3935 9.5392C12.3935 9.63821 12.3739 9.73624 12.3358 9.82763C12.2977 9.91903 12.2419 10.002 12.1716 10.0717L7.67161 14.5717C7.60153 14.6412 7.51842 14.6962 7.42704 14.7335C7.33567 14.7709 7.23782 14.7898 7.13911 14.7892Z"
                          fill="#BABAC0"
                        ></path>
                      </svg>
                      ortga qaytish
                    </button>
                    <NuxtLink
                      @click="(openCotalog = false), (overlay = false)"
                      class="cotalog-wrapper__sub-menu__title"
                      :to="localePath(`/category/${item.slug}`)"
                    >
                      {{ item?.name }}
                    </NuxtLink>
                    <li v-for="sm in item.categories" :key="sm">
                      <div class="cotalog-wrapper__sub-menu__name">
                        <NuxtLink
                          :to="localePath(`/kotalog/${item.slug}`)"
                          @click="(openCotalog = false), (overlay = false)"
                        >
                          {{ sm?.name }}</NuxtLink
                        >
                      </div>
                    </li>
                  </div>
                </ul>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </Transition>

    <div class="header-bottom">
      <div class="container bottom-container">
        <div class="header-bootom-cotegory" @click="openCotalog = !openCotalog">
          <img src="../assets/images/svg/list.svg" alt="list" />
          <p class="header-bootom-cotegory__text">{{ t("cotegory") }}</p>
        </div>
        <nav>
          <ul>
            <li v-for="item in headercotegory?.data" :key="item">
              <NuxtLink
                class="link"
                :to="localePath(`/category/${item.slug}`)"
                >{{ item?.name }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="header-nav-bottom">
      <nav>
        <ul>
          <li @click="(openCotalog = !openCotalog), (store.navbar = false)">
            <img src="../assets/images/svg/cotegory.svg" alt="svg" />
            <p>{{ t("cotegory") }}</p>
          </li>
          <li>
            <NuxtLink class="nav-link" to="/basket">
              <img src="../assets/images/svg/bag.svg" alt="svg" />
              <p>{{ t("basket") }}</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="nav-link" to="/save">
              <img src="../assets/images/svg/heard.svg" alt="svg" />
              <p>{{ t("heart") }}</p>
            </NuxtLink>
          </li>
          <li>
            <button
            v-if="!store.token"
            class="header-midle-items-icon"
            @click="store.contactopen = !store.contactopen"
          >
            <img src="../assets/images/svg/pagej.svg" alt="pagej" />
          </button>
          <NuxtLink v-else class="header-midle-items-icon" to="/profil">
            <img src="../assets/images/svg/pagej.svg" alt="pagej" />
          </NuxtLink>
            <p>{{ t("entr") }}</p>
          </li>
        </ul>
      </nav>
    </div>

    <Transition name="open">
      <div class="header-navbar" v-if="store.navbar">
        <section>
          <img
            class="header-navbar-img"
            src="../assets/images/svg/Frame.svg"
            alt="Frame"
          />
          <div class="header-navbar-contact">
            <img
              class="header-navbar-contact__img"
              src="../assets/images/svg/pagej.svg"
              alt="svg"
            />
            <p>{{ t("personal") }}</p>
          </div>
          <div
            class="header-navbar-items"
            v-for="item in cotegory?.data"
            :key="item"
          >
            <p>{{ item?.name }}</p>
          </div>
         
            <div class="header-navbar-leng">
          <section @click="store.language = !store.language">
            <p>{{ locale }}</p>
            <div class="chevron-img" :class="{ rotate: store.language }">
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.26318 18L15.2663 12L9.26318 6"
                  stroke="#000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </section>

          <transition name="lang">
            <ul v-if="store.language">
              <li
                @click="store.language = false"
                v-for="{ code, name } in locales"
                :key="code"
              >
                <NuxtLink class="lang-link" :to="switchLocalePath(code)">{{
                  name
                }}</NuxtLink>
              </li>
            </ul>
          </transition>
        </div>
        </section>
        <div
          class="navbar-delet"
          @click="(store.navbar = false), (store.over = false)"
        >
          <img src="../assets/images/svg/delet.svg" alt="delet" />
        </div>
      </div>
    </Transition>

    <ContaktFirst />

    <ContaktSecont />

    <ContaktThert />

    <contaktFour />
  </header>

  <div
    class="over"
    v-if="store.over"
    @click="(store.over = false), (store.navbar = false)"
  ></div>
  <div
    class="over"
    v-if="store.contactopen"
    @click="store.contactopen = false"
  ></div>
  <div
    class="over"
    v-if="store.contactopen2"
    @click="store.contactopen2 = false"
  ></div>
  <div
    class="over"
    v-if="store.contactopen3"
    @click="store.contactopen3 = false"
  ></div>
  <div
    class="over"
    v-if="store.contactopen4"
    @click="store.contactopen4 = false"
  ></div>

  <NuxtPage />

  <div class="future">
    <div class="container future-container">
      <div class="future-left">
        <img
          class="future-left__img"
          src="../assets/images/svg/logo2.svg"
          alt=""
        />
        <p class="future-about">{{ about?.data?.call_center_working_house }}</p>
        <p class="future-about">
          {{ t("call") }} {{ about?.data?.call_center_phone }}
        </p>
        <div class="future-socials">
          <NuxtLink
            class="social-link"
            :to="socilas?.data?.telegram_url"
            target="blank"
          >
            <img src="../assets/images/svg/telegram.svg.svg" alt="telegram" />
          </NuxtLink>
          <NuxtLink
            class="social-link"
            :to="socilas?.data?.instagram_url"
            target="blank"
          >
            <img src="../assets/images/svg/instagram.svg.svg" alt="instagram" />
          </NuxtLink>
          <NuxtLink
            class="social-link"
            :to="socilas?.data?.facebook_url"
            target="blank"
          >
            <img src="../assets/images/svg/facebook.svg.svg" alt="facebook" />
          </NuxtLink>
          <NuxtLink
            class="social-link"
            :to="socilas?.data?.youtube_url"
            target="blank"
          >
            <img src="../assets/images/svg/youtube.svg.svg" alt="youtube" />
          </NuxtLink>
        </div>
      </div>

      <div class="future-right">
        <nav>
          <h3 class="future-right-title">{{ t("cotegory") }}</h3>
          <ul>
            <li v-for="item in headercotegory?.data" :key="item">
              <NuxtLink
                class="future-link"
                :to="localePath(`/category/${item.slug}`)"
                >{{ item?.name }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
        <nav>
          <h3 class="future-right-title">{{ t("information") }}</h3>
          <ul>
            <li v-for="item in cotegory?.data" :key="item">
              <NuxtLink class="future-link" to="/">{{ item?.name }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import service from "~/services/service";
import { useStore } from "~~/store/store";
const store = useStore();
const headercotegory = ref({});
const socilas = ref({});
const about = ref({});
const cotegory = ref({});
const headerkatalog = ref({});
const openCotalog = ref(false);
const localePath = useLocalePath();
const { locales, locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
function addClass(e) {
  let siblings = Array.from(e.target.parentElement.children);
  siblings.forEach((el) => {
    if (el !== e.target) {
      el.classList.remove("open");
    }
  });
  e.target.classList.add("open");
}

const searchItems = ref([]);
async function updateSearchItems(e) {
  const data = await $fetch(
    `https://api.mtdmarket.uz/api/product-manager/product/search?searchKey=${e.target.value}`,
    {
      method: "GET",
    }
  );
  searchItems.value = data?.data;
}
const clearSearch = () => {
  searchItems.value = "";
  searchItems = false;
  document.querySelector(".midle-input").value = "";
};

async function getheadercotegorys() {
  const res = await service.getheadercotegorys(store.token, locale.value);
  headercotegory.value = res;
}
async function getsocials() {
  const res = await service.getsocials(store.token);
  socilas.value = res;
}
async function getabout() {
  const res = await service.getabout(store.token, locale.value);
  about.value = res;
}
async function getcotegory() {
  const res = await service.getcotegory(store.token, locale.value);
  cotegory.value = res;
}
async function getheadercotelog() {
  const res = await service.getheadercotelog(store.token, locale.value);
  headerkatalog.value = res;
}
const cartLength = computed(() => {
  let length = 0;
  store.cart.forEach((el) => {
    length += el.quantity;
  });
  return length;
});
const saveLength = computed(() => {
  let length = 0;
  store.save.forEach((el) => {
    length += el.quantity;
  });
  return length;
});
function backCotalog() {
  document.querySelectorAll(".cotalog-wrapper__item").forEach((el) => {
    el.classList.remove("open");
  });
}

useHead({
  title: "Fazo",
  meta: [{ name: "description", content: "Fazo" }],
});

getheadercotegorys();
getsocials();
getabout();
getcotegory();
getheadercotelog();

watch(
  () => locale.value,
  (newVal, oldVal) => {
    getheadercotegorys();
    getsocials();
    getabout();
    getcotegory();
    getheadercotelog();
  }
);
</script>

<style lang="scss">
.big-title {
  text-decoration: none;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transition: all 0.5s ease;
}

.open-enter-active,
.open-leave-active {
  transform: translateX(0);
  transition: all 0.5s ease;
}

.open-enter-from,
.open-leave-to {
  transform: translateX(-100%);
  transition: all 0.5s ease;
}

.contact-enter-active,
.contact-leave-active {
  opacity: 1;
  transition: all 0.5s ease;
}

.contact-enter-from,
.contact-leave-to {
  opacity: 0;
  transition: all 0.5s ease;
}
.lang-enter-active,
.lang-leave-active {
  opacity: 1;
  transition: all 0.3s ease;
  transform: translateY(0);
}

.lang-enter-from,
.lang-leave-to {
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(-20px);
}
</style>
