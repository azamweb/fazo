<template>
  <div>
    <div class="loading-page" v-if="loading">
      <div class="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

  
<style >
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(214, 213, 213, 0.6), rgba(243, 243, 243, 0.6));
  
  z-index: 111;
}
.loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  animation-name: rotateAnim;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
.loader div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #2261d6;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  animation-name: translateAnim;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
.loader div:nth-child(1) {
  top: -20px;
  animation-name: translateAnimTop;
}
.loader div:nth-child(2) {
  left: 20px;
  animation-name: translateAnimRight;
}
.loader div:nth-child(3) {
  top: 20px;
  animation-name: translateAnimBottom;
}
.loader div:nth-child(4) {
  left: -20px;
  animation-name: translateAnimLeft;
}
@keyframes rotateAnim {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(90deg);
  }
  75% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
@keyframes translateAnimTop {
  0% {
    transform: translateY(0px);
    background-color: #2261d6;
  }
  25% {
    transform: translateY(0px);
    background-color: #2261d6;
  }
  50% {
    transform: translateY(-20px);
    background-color: #fff;
  }
  75% {
    transform: translateY(-20px);
    background-color: #fff;
  }
  100% {
    transform: translateY(0px);
    background-color: #2261d6;
    background-color: #2261d6;
  }
}
@keyframes translateAnimBottom {
  0% {
    transform: translateY(0px);
    background-color: #2261d6;
  }
  25% {
    transform: translateY(0px);
    background-color: #2261d6;
  }
  50% {
    transform: translateY(20px);
    background-color: #fff;
  }
  75% {
    transform: translateY(20px);
    background-color: #fff;
  }
  100% {
    transform: translateY(0px);
    background-color: #2261d6;
  }
}
@keyframes translateAnimLeft {
  0% {
    transform: translateX(0px);
    background-color: #2261d6;
  }
  25% {
    transform: translateX(0px);
    background-color: #2261d6;
  }
  50% {
    transform: translateX(-20px);
    background-color: #fff;
  }
  75% {
    transform: translateX(-20px);
    background-color: #fff;
  }
  100% {
    transform: translateX(0px);
    background-color: #2261d6;
  }
}
@keyframes translateAnimRight {
  0% {
    transform: translateX(0px);
    background-color: #2261d6;
  }
  25% {
    transform: translateX(0px);
    background-color: #2261d6;
  }
  50% {
    transform: translateX(20px);
    background-color: #fff;
  }
  75% {
    transform: translateX(20px);
    background-color: #fff;
  }
  100% {
    transform: translateX(0px);
    background-color: #2261d6;
  }
}
</style>