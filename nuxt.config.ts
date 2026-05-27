export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages: true,
  runtimeConfig: {
    public: {
      // demo runtime config for API base (used by composables/useApi.ts)
      apiBase: '',
    },
  },
  modules: [],
})
