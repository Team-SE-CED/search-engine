export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/search") {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo("/search", { redirectCode: 301 });
  }
});
