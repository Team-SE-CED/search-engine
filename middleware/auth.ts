export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/login") {
    // setting the redirect code to '301 Moved Permanently'
    return navigateTo("/login", { redirectCode: 301 });
  }
});
