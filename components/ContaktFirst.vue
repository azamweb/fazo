<template>
    <div>
        <Transition name="contact">
      <div class="header-contact" v-if="store.contactopen">
        <div class="header-contact-top">
          <p>{{ t("entr") }}</p>
          <img
            @click="store.contactopen = false"
            src="../assets/images/svg/close2.svg"
            alt="remove"
          />
        </div>
        <form @submit.prevent="login()">
          <div class="header-contact-form-first">
            <p>{{ t("phone") }}</p>
            <input v-model="telnumber" type="tel" placeholder="998(" />
          </div>
          <div class="header-contact-form-first">
            <p>parol</p>
            <input
              v-model="password"
              type="password"
              placeholder="parolingizni kriting"
            />
          </div>

          <div class="header-form-btn">
            <button type="submit">{{ t("entr") }}</button>
            <button
              type="button"
              @click="
                (store.contactopen2 = !store.contactopen2),
                  (store.contactopen = false)
              "
            >
              {{ t("signup") }}
            </button>
          </div>
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
const password = ref("");

async function login() {
  const body = {
    username: telnumber.value,
    password: password.value,
  };
  const res = await service.login(body);
  console.log(res);
  if (res.status == 200) {
    localStorage.setItem("token", res.data.auth_key);
    store.contactopen = false
    window.location.href = "/"
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