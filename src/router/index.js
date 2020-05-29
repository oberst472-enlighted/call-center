import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
  const routes = [
    {
      path: '/',
      redirect: '/call-terminals'
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: "empty-layout" },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/call-list',
      name: 'call-list',
      meta: { layout: "main-layout" },
      component: () => import('../views/CallList.vue')
    },
    {
      path: '/call-terminals',
      name: 'call-terminals',
      meta: { layout: "main-layout" },
      component: () => import('../views/CallTerminals.vue')
    },
    {
      path: '/call-page',
      name: 'call-page',
      meta: { layout: "call-layout" },
      component: () => import('../views/CallPage.vue')
    },
    {
      path: '/single-terminal/:id',
      name: 'single-terminal',
      meta: { layout: "main-layout" },
      component: () => import('../views/SingleTerminal.vue')
    },
    {
      path: '/single-call/:id',
      name: 'single-call',
      meta: { layout: "main-layout" },
      component: () => import('../views/SingleCall.vue')
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next)=>{
  if(from.path === to.path){
    return
  }
  console.log(to)
  console.log(from)
  next()
})

export default router
