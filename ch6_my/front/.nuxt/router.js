import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ac390248 = () => interopDefault(import('..\\pages\\graph.vue' /* webpackChunkName: "pages_graph" */))
const _610a8c8c = () => interopDefault(import('..\\pages\\groups\\index.vue' /* webpackChunkName: "pages_groups_index" */))
const _b4c20792 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _227e970c = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _e9288fe4 = () => interopDefault(import('..\\pages\\groups\\_id\\index.vue' /* webpackChunkName: "pages_groups__id_index" */))
const _0313309c = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _651c495a = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _7ebe32f6 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _8092f740 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    path: "/graph",
    component: _ac390248,
    name: "graph"
  }, {
    path: "/groups",
    component: _610a8c8c,
    name: "groups"
  }, {
    path: "/profile",
    component: _b4c20792,
    name: "profile"
  }, {
    path: "/signup",
    component: _227e970c,
    name: "signup"
  }, {
    path: "/groups/:id",
    component: _e9288fe4,
    name: "groups-id"
  }, {
    path: "/hashtag/:id?",
    component: _0313309c,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _651c495a,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _7ebe32f6,
    name: "user-id"
  }, {
    path: "/",
    component: _8092f740,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
