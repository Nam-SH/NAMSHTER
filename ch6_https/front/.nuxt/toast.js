import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {"position":"top-center"})

const globals = [{"name":"test","message":"Oops...Something went wrong","options":{"type":"error","duration":1000}}]
if(globals) {
  globals.forEach(global => {
    Vue.toasted.register(global.name, global.message, global.options)
  })
}

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}
