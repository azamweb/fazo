<template>
  <div>
    <Transition name="contact">
      <div class="header-contakt-four" v-if="store.contactopen4">
        <div class="header-contakt-four-top">
          <p>{{ t("signup") }}</p>
          <img
            @click="store.contactopen4 = false"
            src="../assets/images/svg/close2.svg"
            alt="remove"
          />
        </div>

        <form @submit.prevent="signuplogin()">
          <input v-model="name" type="text" placeholder="Ism" />
          <input v-model="lastname" type="text" placeholder="Familiya" />
          <input v-model="password" type="password" placeholder="parol" />
          <input
            v-model="passwordrepeat"
            type="password"
            placeholder="parolni tastiqlang"
          />

          <button>{{ t("signup") }}</button>
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
const name = ref("");
const lastname = ref("");
const password = ref("");
const passwordrepeat = ref("");

async function signuplogin() {
  const body = {
    firstname: name.value,
    lastname: lastname.value,
    password: password.value,
    password_repeat: passwordrepeat.value,
    phone: store.phone,
    code: store.code,
  };
  const res = await service.signup(body);
  console.log(res);
  if (res.status == 200) {
    store.contactopen4 = false;
    store.contactopen3 = false;
    localStorage.setItem("token", res.data.auth_key);
    window.location.href = "/";
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