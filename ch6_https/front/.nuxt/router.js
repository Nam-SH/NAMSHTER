import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _26b8bcc6 = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _3fea7eea = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _4aad7208 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _8ca63002 = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _17d87eee = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _4a3a259d = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _1975ac03 = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _df1262ae = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _28092858 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _c24b8b1e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _26b8bcc6,
    name: "groups"
  }, {
    path: "/main",
    component: _3fea7eea,
    name: "main"
  }, {
    path: "/profile",
    component: _4aad7208,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _8ca63002,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _17d87eee,
    name: "signup"
  }, {
    path: "/groups/:id",
    component: _4a3a259d,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _1975ac03,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _df1262ae,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _28092858,
    name: "user-id"
  }, {
    path: "/",
    component: _c24b8b1e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
