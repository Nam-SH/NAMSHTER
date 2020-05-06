import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2cb293df = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages_blog_index" */))
const _5fc0dcad = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _16bb91da = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _824f8dd0 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _2084feef = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _5aebd779 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _48524c9b = () => interopDefault(import('..\\pages\\blog\\_id\\index.vue' /* webpackChunkName: "pages_blog__id_index" */))
const _0a77548d = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _60de5b13 = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _f1da0cce = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _3ad0d278 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _bba8f4fe = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _2cb293df,
    name: "blog"
  }, {
    path: "/groups",
    component: _5fc0dcad,
    name: "groups"
  }, {
    path: "/main",
    component: _16bb91da,
    name: "main"
  }, {
    path: "/profile",
    component: _824f8dd0,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _2084feef,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _5aebd779,
    name: "signup"
  }, {
    path: "/blog/:id",
    component: _48524c9b,
    name: "blog-id"
  }, {
    path: "/groups/:id",
    component: _0a77548d,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _60de5b13,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _f1da0cce,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _3ad0d278,
    name: "user-id"
  }, {
    path: "/",
    component: _bba8f4fe,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
