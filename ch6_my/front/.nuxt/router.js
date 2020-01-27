import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _25333f6d = () => interopDefault(import('..\\pages\\group.vue' /* webpackChunkName: "pages_group" */))
const _7ca9dfd2 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _18f2a49a = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _56b8a8dc = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _4a38917a = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _b485a2b6 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _4d761040 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    path: "/group",
    component: _25333f6d,
    name: "group"
  }, {
    path: "/profile",
    component: _7ca9dfd2,
    name: "profile"
  }, {
    path: "/signup",
    component: _18f2a49a,
    name: "signup"
  }, {
    path: "/hashtag/:id?",
    component: _56b8a8dc,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _4a38917a,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _b485a2b6,
    name: "user-id"
  }, {
    path: "/",
    component: _4d761040,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
