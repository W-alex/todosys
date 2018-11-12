// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import axios from 'axios'
import global from "./util/properties"
import store from "./store"
import "./util/permission"
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(elementUI)
Vue.prototype.$http = axios
Vue.prototype.$global = global

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
