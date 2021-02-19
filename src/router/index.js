import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import {isRoleAdmin, isRoleOperator, isUserAuth} from '@/utils/middleware'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL
    routes: [
        {
            path: '/',
            redirect: ('/login')
        },
        {
            path: '/404',
            name: '404',
            component: require('@/pages/404/').default,
        },
        {
            path: '/logout',
            name: 'logout',
            component: require('@/layouts/logout/').default,
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '',
            component: require('@/layouts/login/').default,
            children: [
                {
                    path: '/login',
                    name: 'login',
                    components: {
                        default: require('@/pages/login').default
                    }
                },
                {
                    path: '/reset-password',
                    name: 'resetPassword',
                    components: {
                        default: require('@/pages/reset-password').default
                    }
                }
            ]
        },
        {
            path: '',
            component: require('@/layouts/operator/default/').default,
            children: [
                {
                    path: '/home',
                    name: 'home_operator',
                    components: {
                        default: require('@/pages/operator/dashboard').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: '/detail-call/:id',
                    name: 'detail-call_operator',
                    components: {
                        default: require('@/pages/operator/detail-call').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: '/detail/:id',
                    name: 'terminal-fullstory',
                    components: {
                        default: require('@/pages/operator/terminal-fullstory').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: '/calls/',
                    name: 'calls',
                    components: {
                        default: require('@/pages/operator/calls').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: '/terminals/',
                    name: 'terminals',
                    components: {
                        default: require('@/pages/terminals').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: '/statistics/',
                    name: 'statistics',
                    components: {
                        default: require('@/pages/operator/stat').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: '/edit-profile-operator/',
                    name: 'edit-info_operator',
                    components: {
                        default: require('@/pages/operator/edit-info-operator').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
            ]
        },
        {
            path: '',
            component: require('@/layouts/operator/call-video/').default,
            children: [
                {
                    path: '/call/:id',
                    name: 'call-form-data',
                    components: {
                        default: require('@/pages/operator/call-video').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleOperator()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                }
            ]
        },
        {
            path: '',
            component: require('@/layouts/admin/default/').default,
            children: [
                {
                    path: 'admin/home',
                    name: 'home_admin',
                    components: {
                        default: require('@/pages/admin/dashboard').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/calls/',
                    name: 'calls_admin',
                    components: {
                        default: require('@/pages/admin/calls').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/terminals/',
                    name: 'terminals_admin',
                    components: {
                        default: require('@/pages/terminals').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/users/',
                    name: 'users_admin',
                    components: {
                        default: require('@/pages/admin/users').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/stat/',
                    name: 'stat_admin',
                    components: {
                        default: require('@/pages/admin/stat').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/create-operator/',
                    name: 'create-operator_admin',
                    components: {
                        default: require('@/pages/admin/create-operator').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: '/admin/edit-profile-admin/',
                    name: 'edit-info_admin',
                    components: {
                        default: require('@/pages/admin/edit-info-admin').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/edit-profile-operator/:id',
                    name: 'edit-info-operator_admin',
                    components: {
                        default: require('@/pages/admin/edit-info-operator').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/detail-call/:id',
                    name: 'detail-call_admin',
                    components: {
                        default: require('@/pages/admin/detail-call').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/detail-operator/:id',
                    name: 'detail-operator_admin',
                    components: {
                        default: require('@/pages/admin/detail-operator').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/detail-terminal/:id',
                    name: 'detail-terminal_admin',
                    components: {
                        default: require('@/pages/admin/detail-terminal').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
                {
                    path: 'admin/reset-password/:id',
                    name: 'reset-password_admin',
                    components: {
                        default: require('@/pages/admin/set-new-password').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                    beforeEnter: (to, from, next) => {
                        if (!isUserAuth()) {
                            next({name: 'login'})
                        }
                        if (!isRoleAdmin()) {
                            next({name: '404'})
                        }
                        else {
                            next()
                        }
                    }
                },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (from.name === 'login' || from.name === 'call-form-data' || to.name === 'home_operator' || to.name === 'home_admin') {
        store.commit('SET_BACK_BTN_ACTIVE', false)
    }
    else {
        store.commit('SET_BACK_BTN_ACTIVE')
    }
    next()
})

export default router
