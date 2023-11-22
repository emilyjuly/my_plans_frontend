// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@pinia/nuxt", "@nuxt/image"],
  primevue: {
    components: {
      include: "*",
    },
    directives: {
      include: "*",
    },
    usePrimeVue: true,
  },
  css: [
    "@/assets/scss/main.scss",
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.min.css",
    "primeicons/primeicons.css",
  ],
});
