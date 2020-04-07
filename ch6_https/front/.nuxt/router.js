import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _188b9a25 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages_blog_index" */))
const _8d1d2d1a = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _57fb2358 = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _180b525e = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _b0f2b62e = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _3c25051a = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _debf7bd6 = () => interopDefault(import('..\\pages\\blog\\_id\\index.vue' /* webpackChunkName: "pages_blog__id_index" */))
const _771dd387 = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _edf0894e = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _613e21da = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _2ae58c3e = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _e47f8f72 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _188b9a25,
    name: "blog"
  }, {
    path: "/groups",
    component: _8d1d2d1a,
    name: "groups"
  }, {
    path: "/main",
    component: _57fb2358,
    name: "main"
  }, {
    path: "/profile",
    component: _180b525e,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _b0f2b62e,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _3c25051a,
    name: "signup"
  }, {
    path: "/blog/:id",
    component: _debf7bd6,
    name: "blog-id"
  }, {
    path: "/groups/:id",
    component: _771dd387,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _edf0894e,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _613e21da,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _2ae58c3e,
    name: "user-id"
  }, {
    path: "/",
    component: _e47f8f72,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
