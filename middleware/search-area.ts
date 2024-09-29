export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/search-area') {
      // setting the redirect code to '301 Moved Permanently'
      return navigateTo('/search-area', { redirectCode: 301 })
    }
  })