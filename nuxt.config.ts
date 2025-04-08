export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },

  app: {
    head: {
      title: 'Next',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  modules: ['@nuxtjs/i18n', '@nuxt/ui', '@nuxtjs/supabase'],

  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/']
    }
  },

  runtimeConfig: {
    public: {
      appName: 'FeedbackHub',
      apiBaseUrl: process.env.API_BASE_URL
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    classSuffix: ''
  },

  compatibilityDate: '2025-03-21'
})
