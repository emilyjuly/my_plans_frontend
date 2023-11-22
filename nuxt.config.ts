// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  imports: {
    dirs: ["stores"],
  },
  css: ["primeflex/primeflex.css"],
});
