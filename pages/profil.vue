<template>
  <div>
    <div class="header-profil">
      <transition name="contact">
        <div class="header-profil-chang" v-if="store.namechange">
          <div class="header-profil-chang-top">
            <p>{{ t("change") }}</p>
            <img
              @click="store.namechange = false"
              src="../assets/images/svg/close2.svg"
              alt="remove"
            />
          </div>

          <form @submit.prevent="changeuser()">
            <input v-model="name" type="text" placeholder="Ism" />
            <input v-model="lastname" type="text" placeholder="Familiya" />

            <button>{{ t("change") }}</button>
          </form>
        </div>
      </transition>

      <div class="container profil-container">
        <div class="header-profil-back" @click="backpsofil(e)">
          <img src="../assets/images/svg/goback.svg" alt="go back" />
          <p>{{ t("back") }}</p>
        </div>

        <div class="header-profil-right">
          <div class="header-profil-right-personal">
            <section>
              <img src="../assets/images/svg/pagej.svg" alt="" />
              <h4>{{ t("personal") }}</h4>
            </section>
            <button @click="store.namechange = !namechange">{{ t("change") }}</button>
          </div>

          <div class="header-profil-right-about">
            <section>
              <h3>{{ userprofil?.data?.firstname }}</h3>
              <h3>{{ userprofil?.data?.lastname }}</h3>
            </section>
            <p>{{ t("phone") }} {{ userprofil?.data?.username }}</p>
          </div>

          <div class="header-profil-right-items">
            <div class="header-profil-right-item-left">
              <img src="../assets/images/svg/document.svg" alt="" />
              <p>{{ t("order") }}</p>
            </div>

            <div class="header-profil-right-btns">
              <button>{{ t("curent") }}</button>
              <button>{{ t("all") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="over"
      v-if="store.namechange"
      @click="store.namechange = false"
    ></div>
  </div>
</template>

<script setup>
import service from "~/services/service";
import { useStore } from "~~/store/store";
const store = useStore();
const userprofil = ref({});
const {locale, t} = useI18n()
const name = ref("");
const lastname = ref("");


async function getUserInfo() {
  const res = await service.getUserInfo(store.token);
  console.log(res);
  userprofil.value = res;
  name.value = res.data.firstname
  lastname.value = res.data.lastname
}

async function changeuser() {
  const body = {
    firstname: name.value,
    lastname: lastname.value,
  };
  const res = await service.updatauser(body, store.token);
  if (res.status == 200) {
    store.namechange = false;
    getUserInfo();
  }
}

function backpsofil(e) {
  localStorage.clear()
  window.location.href = "/"
}


getUserInfo();
watch(
  () => store.token,
  () => {
    getUserInfo();
  }
);
</script>

<style lang="scss">
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
</style>