import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7d08472b = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages_blog_index" */))
const _a6b198ee = () => interopDefault(import('..\\pages\\chart\\index.vue' /* webpackChunkName: "pages_chart_index" */))
const _1d12260e = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _060087e4 = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _15437264 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _f33127ba = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _7e6376a6 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _4de8178d = () => interopDefault(import('..\\pages\\chart\\line.vue' /* webpackChunkName: "pages_chart_line" */))
const _4b766e62 = () => interopDefault(import('..\\pages\\blog\\_id\\index.vue' /* webpackChunkName: "pages_blog__id_index" */))
const _2c88d87e = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _6a22025f = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _190575cd = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _748a12f8 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _f726bc66 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    path: "/blog",
    component: _7d08472b,
    name: "blog"
  }, {
    path: "/chart",
    component: _a6b198ee,
    name: "chart"
  }, {
    path: "/groups",
    component: _1d12260e,
    name: "groups"
  }, {
    path: "/main",
    component: _060087e4,
    name: "main"
  }, {
    path: "/profile",
    component: _15437264,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _f33127ba,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _7e6376a6,
    name: "signup"
  }, {
    path: "/chart/line",
    component: _4de8178d,
    name: "chart-line"
  }, {
    path: "/blog/:id",
    component: _4b766e62,
    name: "blog-id"
  }, {
    path: "/groups/:id",
    component: _2c88d87e,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _6a22025f,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _190575cd,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _748a12f8,
    name: "user-id"
  }, {
    path: "/",
    component: _f726bc66,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
