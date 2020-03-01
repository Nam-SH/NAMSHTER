import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d2d8fd2e = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _4045699e = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _c277ca58 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _0ef7f5b3 = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _495ece3d = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _627a4551 = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _093982cf = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _51e34b5d = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _a5302ef0 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _ac46b386 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _d2d8fd2e,
    name: "groups"
  }, {
    path: "/main",
    component: _4045699e,
    name: "main"
  }, {
    path: "/profile",
    component: _c277ca58,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _0ef7f5b3,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _495ece3d,
    name: "signup"
  }, {
    path: "/groups/:id",
    component: _627a4551,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _093982cf,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _51e34b5d,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _a5302ef0,
    name: "user-id"
  }, {
    path: "/",
    component: _ac46b386,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
