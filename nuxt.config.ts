// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["@/assets/scss/main.scss"],
  modules: ["@pinia/nuxt", "nuxt-swiper", "@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "uz",
    langDir: "./locales/",
    locales: [
      {
        code: "uz",
        name: "uz",
        file: "uz.json"
      },
      {
        code: "ru",
        name: "ru",
        file: "ru.json"
      },
      {
        code: "en",
        name: "en",
        file: "en.json"
      },
    ]
  }
  
});