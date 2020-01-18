module.exports = {
  head: {
      title: 'NAM-SH',
  },
  modules: [
    '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  plugins: [],
  vuetify: {},
  axios: {
    browserBaseURL: 'http://localhost:3085',
    baseURL: 'http://localhost:3085',
    https: false
  },
  server: {
    port: 3081,
  },
}