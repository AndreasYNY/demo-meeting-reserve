export default defineNuxtRouteMiddleware((to, from) => {
    // im not going to check if the cookie valid, no time for that
    const cookie = useCookie('token')
    if (!cookie.value && to.path !== '/login') {
        return navigateTo('/login')
    }
})