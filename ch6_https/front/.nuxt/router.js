import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _94c513da = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _7450a498 = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _76e556fe = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _79098c49 = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _991f365a = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _7cbeaa32 = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _e240600e = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _59721e73 = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _961288c4 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _52da3632 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    path: "/groups",
    component: _94c513da,
    name: "groups"
  }, {
    path: "/main",
    component: _7450a498,
    name: "main"
  }, {
    path: "/profile",
    component: _76e556fe,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _79098c49,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _991f365a,
    name: "signup"
  }, {
    path: "/groups/:id",
    component: _7cbeaa32,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _e240600e,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _59721e73,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _961288c4,
    name: "user-id"
  }, {
    path: "/",
    component: _52da3632,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
