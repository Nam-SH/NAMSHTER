import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4c06eaac = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages_profile" */))
const _59d2b936 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages_signup" */))
const _144b4ea7 = () => interopDefault(import('..\\pages\\hashtag\\_id\\index.vue' /* webpackChunkName: "pages_hashtag__id_index" */))
const _215e62f6 = () => interopDefault(import('..\\pages\\post\\_id\\index.vue' /* webpackChunkName: "pages_post__id_index" */))
const _4ad56bb0 = () => interopDefault(import('..\\pages\\user\\_id\\index.vue' /* webpackChunkName: "pages_user__id_index" */))
const _7cc18c15 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _4c06eaac,
    name: "profile"
  }, {
    path: "/signup",
    component: _59d2b936,
    name: "signup"
  }, {
    path: "/hashtag/:id?",
    component: _144b4ea7,
    name: "hashtag-id"
  }, {
    path: "/post/:id?",
    component: _215e62f6,
    name: "post-id"
  }, {
    path: "/user/:id?",
    component: _4ad56bb0,
    name: "user-id"
  }, {
    path: "/",
    component: _7cc18c15,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
