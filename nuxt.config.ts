// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt","@nuxt/ui"],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: "/selector",
      callback: "/confirm",
      include: undefined,
      exclude: ["/signup", "/login"],
      cookieRedirect: false,
    },
  },
  css: ["@/assets/global.css"],
});
