export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/selector') {
        // setting the redirect code to '301 Moved Permanently'
        return navigateTo('/selector', { redirectCode: 301 })
      }
    else {
      return navigateTo('/login', { redirectCode: 301 })
    }
    })
