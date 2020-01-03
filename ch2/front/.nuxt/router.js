import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3ad757e4 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _b334f47a = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _30fde5f7 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/profile",
    component: _3ad757e4,
    name: "profile"
  }, {
    path: "/signup",
    component: _b334f47a,
    name: "signup"
  }, {
    path: "/",
    component: _30fde5f7,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}