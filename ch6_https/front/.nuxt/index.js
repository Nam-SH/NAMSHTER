import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_workbox_2d8e3c82 from 'nuxt_plugin_workbox_2d8e3c82' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_28b555c5 from 'nuxt_plugin_nuxticons_28b555c5' // Source: .\\nuxt-icons.js (mode: 'all')
import nuxt_plugin_plugin_6b104298 from 'nuxt_plugin_plugin_6b104298' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_toast_b9fcf3dc from 'nuxt_plugin_toast_b9fcf3dc' // Source: .\\toast.js (mode: 'client')
import nuxt_plugin_editorclient_1c5cdb01 from 'nuxt_plugin_editorclient_1c5cdb01' // Source: .\\tui\\editor.client.js (mode: 'client')
import nuxt_plugin_axios_525d8d3a from 'nuxt_plugin_axios_525d8d3a' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_moment_12018495 from 'nuxt_plugin_moment_12018495' // Source: .\\moment.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Namshter","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"},{"http-equiv":"X-UA-Compatible","content":"IE=edge"},{"hid":"desc","name":"description","content":"Namshter"},{"hid":"ogtitle","name":"og:title","content":"Namshter"},{"hid":"ogdesc","name":"og:description","content":"nam의 Namshter"},{"hid":"ogtype","property":"og:type","content":"website"},{"hid":"ogimage","property":"og:image","content":"http:\u002F\u002Fimg.favpng.com\u002F22\u002F12\u002F5\u002Fdonuts-homer-simpson-coffee-and-doughnuts-sprinkles-frosting-icing-png-favpng-DFWeBHKEQ11Nx79gYhNsK12SU.jpg"},{"hid":"ogurl","property":"og:url","content":"https:\u002F\u002Fnamshter.com"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"NAM.S.H.TER"},{"hid":"author","name":"author","content":"NAM-SH"},{"hid":"theme-color","name":"theme-color","content":"black"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"NAM.S.H.TER"}],"script":[{"src":"https:\u002F\u002Fkit.fontawesome.com\u002F4ddf7507f2.js","crossorigin":"anonymous"}],"link":[{"rel":"shortcut icon","href":"\u002Fdonut.png"},{"rel":"stylesheet","href":"\u002F\u002Fcdn.materialdesignicons.com\u002F5.0.45\u002Fcss\u002Fmaterialdesignicons.min.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.7bf4d2ea.json"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.323ec9.png","sizes":"512x512"}],"style":[],"htmlAttrs":{"lang":"en"}},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_2d8e3c82 === 'function') {
    await nuxt_plugin_workbox_2d8e3c82(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_28b555c5 === 'function') {
    await nuxt_plugin_nuxticons_28b555c5(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_6b104298 === 'function') {
    await nuxt_plugin_plugin_6b104298(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_b9fcf3dc === 'function') {
    await nuxt_plugin_toast_b9fcf3dc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_editorclient_1c5cdb01 === 'function') {
    await nuxt_plugin_editorclient_1c5cdb01(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_525d8d3a === 'function') {
    await nuxt_plugin_axios_525d8d3a(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_12018495 === 'function') {
    await nuxt_plugin_moment_12018495(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
