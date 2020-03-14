import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ded10b7a = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _402f3384 = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _f3fb81a4 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _88d243ce = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _140492ba = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _4f9c7692 = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _4a71f029 = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _33c1277a = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _41a4096e = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _b1a7cdd2 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _ded10b7a,
    name: "groups"
  }, {
    path: "/main",
    component: _402f3384,
    name: "main"
  }, {
    path: "/profile",
    component: _f3fb81a4,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _88d243ce,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _140492ba,
    name: "signup"
  }, {
    path: "/groups/:id",
    component: _4f9c7692,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _4a71f029,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _33c1277a,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _41a4096e,
    name: "user-id"
  }, {
    path: "/",
    component: _b1a7cdd2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
