// import axios from 'axios'
// const siteURL = 'https://api.fbi.gov/wanted/v1/list'

import { fetchAllListings } from './assets/js/recursiveCall.js'

const dynamicRoutes = () => {
  const routes = fetchAllListings().then((res) => {
    return res.data.items.map((pages) => `/file/${pages.uid}`)
  })
  return routes
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'fbi-fancy-listings',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap/dist/css/bootstrap-reboot.min.css',
    'bootstrap/dist/css/bootstrap-grid.min.css',
    '~/assets/styles/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/listing.server.js', mode: 'server' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-rfg-icon',
    '@nuxtjs/manifest',
    [
      'nuxt-social-meta',
      {
        url: 'https://fbi-fancy-listings.vercel.app',
        title: 'FBI | Most Wanted',
        site_name: 'FBI | Most Wanted',
        description: 'FBI most wanted list redesigned',
        img: '/meta.jpg',
        img_size: { width: '1200', height: '630' },
        locale: 'en_US',
        twitter: '@user',
        twitter_card: '/meta.jpg',
        theme_color: '#d5d7ce',
      },
    ],
  ],

  googleFonts: {
    families: {
      'Work+Sans': {
        wght: [400, 500, 600, 700],
      },
    },
  },
  generate: {
    routes: dynamicRoutes,
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
