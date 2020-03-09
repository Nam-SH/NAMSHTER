import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _04127dc0 = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _42e3df67 = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages_main" */))
const _64f0e46b = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _385fc588 = () => interopDefault(import('..\\pages\\qrcode.vue' /* webpackChunkName: "pages_qrcode" */))
const _1e36f5c6 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _4d6e675a = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _7cc9a1e6 = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _7e5a5ba6 = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _4c420e5e = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _09e62cd8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _04127dc0,
    name: "groups"
  }, {
    path: "/main",
    component: _42e3df67,
    name: "main"
  }, {
    path: "/profile",
    component: _64f0e46b,
    name: "profile"
  }, {
    path: "/qrcode",
    component: _385fc588,
    name: "qrcode"
  }, {
    path: "/signup",
    component: _1e36f5c6,
    name: "signup"
  }, {
    path: "/groups/:id",
    component: _4d6e675a,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _7cc9a1e6,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _7e5a5ba6,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _4c420e5e,
    name: "user-id"
  }, {
    path: "/",
    component: _09e62cd8,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
