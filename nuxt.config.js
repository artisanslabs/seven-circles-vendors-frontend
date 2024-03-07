import { I18N } from './plugins/i18n.js'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - الدوائر السبع',
    title: 'الدوائر السبع',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/style.scss'
  ],

  loadingIndicator: {
    color: '#0F6D39'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/global-mixins.js',
    '~/plugins/DatePicker.js'
  ],

  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // 'nuxt-vite',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    component: 'Fa',
    suffix: false,
    icons: {
      solid: true,
      brands: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', '@nuxtjs/auth', ['@nuxtjs/i18n', I18N]
  ],

  generate: {
    fallback: true
  },

  // vite: {
  //   build: true
  // },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/'
    },
    plugins: ['~/plugins/auth.js'],
    watchLoggedIn: true,
    rewriteRedirects: true,
    strategies: {
      local: {
        token: {
          property: 'jwt'
        },
        user: {
          property: false
        },
        endpoints: {
          login: {
            url: '/dashboard/accounts/login',
            method: 'post',
            propertyName: 'data.token'
          },
          logout: {
            url: '/dashboard/accounts/logout',
            method: 'get'
          },
          user: {
            url: '/dashboard/accounts/me',
            method: 'get',
            propertyName: 'data'
          }
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL
  },

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 9000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: false
  }
}
