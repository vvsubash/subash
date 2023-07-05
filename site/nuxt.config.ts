// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet", href: "https://unpkg.com/concrete.css@2.0.3/concrete.css"
        }
      ]
    }
  },
  modules: ['@nuxt/content'],

})
