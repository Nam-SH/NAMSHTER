module.exports = {
  head: {
    title: "Namshter",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"
      },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge"
      },
      {
        hid: "desc",
        name: "description",
        content: "Namshter"
      },
      {
        hid: "ogtitle",
        name: "og:title",
        content: "Namshter"
      },
      {
        hid: "ogdesc",
        name: "og:description",
        content: "nam의 Namshter"
      },
      {
        hid: "ogtype",
        property: "og:type",
        content: "website"
      },
      {
        hid: "ogimage",
        property: "og:image",
        content: "http://img.favpng.com/22/12/5/donuts-homer-simpson-coffee-and-doughnuts-sprinkles-frosting-icing-png-favpng-DFWeBHKEQ11Nx79gYhNsK12SU.jpg"
      },
      {
        hid: "ogurl",
        property: "og:url",
        content: "http://namshter.com"
      }
    ],
    script: [{
      src: "https://kit.fontawesome.com/4ddf7507f2.js",
      crossorigin: "anonymous"
    }],
    link: [{
      rel: "shortcut icon",
      href: "/donut.png"
    }]
  },
  modules: ["@nuxtjs/axios"],
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],
  moment: {
    locales: ["ko"]
  },
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    analyze: false,
    extend(config, {
      isServer,
      isClient,
      isDev
    }) {
      // console.log('webpack :::', config, isServer, isClient);
      if (isServer && !isDev) {
        config.devtool = "hidden-source-map";
      }
    }
  },
  manifest: {
    "gcm_sender_id": "103953800507"
  },
  axios: {
    browserBaseURL: process.env.NODE_ENV === "production" ?
      "http://api.namshter.com" : "http://localhost:3085",
    baseURL: process.env.NODE_ENV === "production" ?
      "http://api.namshter.com" : "http://localhost:3085",
    https: false
  },
  server: {
    port: process.env.PORT || 3081
  }
};