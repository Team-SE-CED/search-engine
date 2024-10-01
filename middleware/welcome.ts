export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/welcome') {
        // setting the redirect code to '301 Moved Permanently'
        return navigateTo('/welcome', { redirectCode: 301 })
      }
    })
