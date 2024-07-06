<template>
  <div>
    <Transition name="contact">
      <div class="header-contakt-secont" v-if="store.contactopen2">
        <div class="header-contact-secont-top">
          <p>{{ t("signup") }}</p>
          <img
            @click="store.contactopen2 = false"
            src="../assets/images/svg/close2.svg"
            alt="remove"
          />
        </div>

        <form @submit.prevent="loginphone()">
          <div class="header-contact-form-secont">
            <p>{{ t("phone") }}</p>
            <input v-model="telnumber" type="tel" placeholder="998(" />
          </div>

          <button type="submit">{{ t("next") }}</button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import service from "~/services/service";
import { useStore } from "~~/store/store";
const store = useStore();
const {locale, t} = useI18n()
const telnumber = ref("+998");

async function loginphone() {
  const body = {
    phone: telnumber.value,
  };
  const res = await service.loginphone(body);
  if (res.status == 200) {
    store.phone = telnumber.value
    store.contactopen3 = !store.contactopen3;
    store.contactopen2 = false;
  }
}
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