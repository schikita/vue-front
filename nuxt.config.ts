// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: { dirs: ["stores"] },
  ssr: true,
  modules: ["nuxt-quasar-ui"],
  buildModules: ["@nuxtjs/pwa"],
  quasar: {
    extras: {
      font: "roboto-font",
      fontIcons: ["material-icons"],
    },
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  pwa: {
    meta: {
      name: "abc",
      author: "abc Inc",
      description: "abc desc",
    },
    manifest: {
      name: "My Awesome App",
      lang: "en",
      useWebmanifestExtension: false,
      start_url: "abc.com",
      display: "standalone",
      background_color: "#fff3e0",
      theme_color: "#fff3e0",
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: "https://assets.abc.com/.*",
          strategyOptions: {
            cacheName: "pwa-image-cache",
          },
          strategyPlugins: [
            {
              use: "Expiration",
              config: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          ],
        },
      ],
    },
  },
  css: ['@/assets/styles/app.scss'],
  runtimeConfig: {
    gwEndPoint: "",

    public: {
      authClientId: "",
      authRealm: "",
      authUrl: "",
      stripeKey: "",
    },
  }
});
