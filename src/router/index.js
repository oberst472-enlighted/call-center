import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import middlewarePipeline from "./middlewarePipeline";
import guest from "./middleware/guest";
import user from "./middleware/user"
import admin from "./middleware/admin";
import operator from "./middleware/operator";

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
  const routes = [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: "empty-layout", gotForward: true, middleware: [ guest ]},
      component: () => import('../views/Login.vue')
    },
    {
      path: '/restore-pass',
      name: 'restore-pass',
      meta: {
        layout: "empty-layout", gotForward: true, middleware: [ guest ]},
      component: () => import('../views/RestorePass')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { layout: "main-layout", gotForward: false, middleware: [ user ]},
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: "main-layout", gotForward: false, middleware: [ operator ]},
      component: () => import('../views/OperatorProfile.vue')
    },
    {
      path: '/call-list',
      name: 'call-list',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/call/CallList.vue')
    },

    {
      path: '/call-list/:id',
      name: 'single-call',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/call/SingleCall.vue')
    },
    {
      path: '/call-terminals',
      name: 'call-terminals',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/terminal/CallTerminals.vue')
    },
    {
      path: '/call-terminals/:id',
      name: 'single-terminal',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/terminal/SingleTerminal.vue')
    },
    {
      path: '/operator-list',
      name: 'operator-list',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/operators/OperatorsList')
    },
    {
      path: '/operator-list/:id',
      name: 'operator-page',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/operators/OperatorPage')
    },
    {
      path: '/operator-list/:id/edit',
      name: 'operator-edit',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/operators/OperatorEdit')
    },
    {
      path: '/statistics',
      name: 'statistics',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user ]},
      component: () => import('../views/Statistics')
    },
    {
      path: '/create-operator',
      name: 'create-operator',
      meta: { layout: "main-layout", gotForward: true, middleware: [ user, admin ]},
      component: () => import('../views/OperatorNew')
    },
    // {
    //   path: '/add-language',
    //   name: 'add-language',
    //   meta: { layout: "main-layout", gotForward: true, middleware: [ user, admin ]},
    //   component: () => import('../views/AddLanguage')
    // },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
