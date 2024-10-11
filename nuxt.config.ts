// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt"],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: "/selector",
      callback: "/confirm",
      include: undefined,
<<<<<<< HEAD
      exclude: ["/signup", "/login"],
=======
      exclude: ["/signup", "/selector"],
>>>>>>> ddda99174433c5c2ebd6c92684685785731ed3e6
      cookieRedirect: false,
    },
  },
  css: ["@/assets/global.css"],
});
