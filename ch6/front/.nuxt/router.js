import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4584d5c0 = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _3935f45e = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _b905888a = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _59efcc1e = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _2e8cb71c = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _0db1a7ae = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    path: "/profile",
    component: _4584d5c0,
    name: "profile"
  }, {
    path: "/signup",
    component: _3935f45e,
    name: "signup"
  }, {
    path: "/hashtag/:id?",
    component: _b905888a,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _59efcc1e,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _2e8cb71c,
    name: "user-id"
  }, {
    path: "/",
    component: _0db1a7ae,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
