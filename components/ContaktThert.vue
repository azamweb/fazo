<template>
  <div>
    <Transition name="contact">
      <div class="header-contact-thert" v-show="store.contactopen3">
        <div class="header-contact-thert-top">
          <p>{{ t("signup") }}</p>
          <img
            @click="store.contactopen3 = false"
            src="../assets/images/svg/close2.svg"
            alt="remove"
          />
        </div>
        <p>{{ t("code") }}</p>
        <form @submit.prevent="verifyingcoding()">
          <div class="header-contact-form-thert">
            <input v-model="verofycode" type="tel" placeholder="kodni kriting" />
          </div>
          <h4 id="time">02:00</h4>
          <button
            @click="
              (store.contactopen4 = !store.contactopen4),
                (store.contactopen3 = false)
            "
          >
          {{ t("sent") }}
          </button>
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
const time = ref(60);
const duration = defineProps(["duration"]);
console.log(duration);

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

function startTime() {
  setTimeout(() => {
    let twoMinutes = time.value * 2;
    let display = document.querySelector("#time");
    startTimer(twoMinutes, display);
  }, 100);
}
watch(()=> store.contactopen3, ()=> {
  startTime()
})




const verofycode = ref("");

async function verifyingcoding() {
  const body = {
    phone: store.phone,
    code: verofycode.value,
  };
  const res = await service.verify(body);
  if (res.status == 200) {
    store.code = verofycode.value
    store.contactopen3 = !store.contactopen3;
    store.contactopen3 = false;
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