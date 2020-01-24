module.exports = {
  head: {
    title: 'NodeBird',
    meta: [{
      charset: 'utf-8',
    }, {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
    }, {
      'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
    }, {
      hid: 'desc', name: 'description', content: 'Namshter',
    }, {
      hid: 'ogtitle', name: 'og:title', content: 'Namshter',
    }, {
      hid: 'ogdesc', name: 'og:description', content: 'nam의 Namshter',
    }, {
      hid: 'ogtype', property: 'og:type', content: 'website',
    }, {
      hid: 'ogimage', property: 'og:image', content: 'https://vue.nodebird.com/vue-nodebird.png',
    }, {
      hid: 'ogurl', property: 'og:url', content: 'https://vue.nodebird.com',
    }],
    link: [{ rel: 'shortcut icon', href: '/donut.png' }],
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/moment',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  moment: {
    locales: ['ko'],
  },
  build: {
    analyze: false,
    extractCSS: true,
    extend(config, { isServer, isClient, isDev }) {
      // console.log('webpack :::', config, isServer, isClient);
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map'
      }
    }
  },
  plugins: [],
  vuetify: {},
  axios: {
    browserBaseURL: process.env.NODE_ENV === 'production' ? 'https://api.namshter.com/api' : 'http://localhost:3085',
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.namshter.com/api' : 'http://localhost:3085',
    https: false
  },
  server: {
    port: process.env.PORT || 3081,
  },
}