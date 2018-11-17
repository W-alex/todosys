import Vue from 'vue'
import Router from 'vue-router'
import app from "@/components/app"
import index from '@/components/index'
import login from "@/components/login"
import register from "@/components/register"

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'app',
    component: app,
    redirect: {
      path: "/index",
    },
    children: [{
      path: "index",
      component: index
    }]
  }, {
    path: "/login",
    name: "login",
    component: login
  }, {
    path: "/register",
    name: "register",
    component: register
  }]
})
