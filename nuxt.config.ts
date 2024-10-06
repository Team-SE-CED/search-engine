// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: ['/signup', '/selector'],
      cookieRedirect: false
    }
  },
  css: ["@/assets/global.css"],
});
