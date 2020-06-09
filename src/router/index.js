import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
      path: '/dashboard',
      name: 'dashboard',
      meta: { layout: "main-layout", requireAuth: true, gotForward: false },
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: "empty-layout", requireAuth: false, gotForward: true },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/call-list',
      name: 'call-list',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/call/CallList.vue')
    },
    {
      path: '/call-terminals',
      name: 'call-terminals',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/terminal/CallTerminals.vue')
    },
    {
      path: '/single-terminal/:id',
      name: 'single-terminal',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/terminal/SingleTerminal.vue')
    },
    {
      path: '/single-call/:id',
      name: 'single-call',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/call/SingleCall.vue')
    },
    {
      path: '/operator-page/:id',
      name: 'operator-page',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/operators/OperatorPage')
    },
    {
      path: '/operator-list',
      name: 'operator-list',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/operators/OperatorsList')
    },
    {
      path: '/statistics',
      name: 'statistics',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/Statistics')
    },
    {
      path: '/create-operator',
      name: 'create-operator',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/OperatorNew')
    },
    {
      path: '/add-language',
      name: 'add-language',
      meta: { layout: "main-layout", requireAuth: true, gotForward: true  },
      component: () => import('../views/AddLanguage')
    },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const requireAuth = to.matched.some(record => record.meta.requireAuth)
  const isUserLoggedIn = store.state.isUserLoggedIn
  if (requireAuth && isUserLoggedIn) {
    next();
  } else {
    if (to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  }
})

export default router
