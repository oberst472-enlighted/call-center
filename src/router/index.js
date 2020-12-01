import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL
    routes: [
        {
            path: '/',
            redirect: ('/login')
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
                    name: 'home-operator',
                    components: {
                        default: require('@/pages/operator/dashboard').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/detail/:id',
                    name: 'call-fullstory',
                    components: {
                        default: require('@/pages/operator/call-fullstory').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/detail/:id',
                    name: 'terminal-fullstory',
                    components: {
                        default: require('@/pages/operator/terminal-fullstory').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/calls/',
                    name: 'calls',
                    components: {
                        default: require('@/pages/operator/calls').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/terminals/',
                    name: 'terminals',
                    components: {
                        default: require('@/pages/operator/terminals').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/statistics/',
                    name: 'statistics',
                    components: {
                        default: require('@/pages/operator/stat').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/profile/',
                    name: 'operator-profile',
                    components: {
                        default: require('@/pages/operator/user-fullstory').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
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
                    }
                }
            ]
        },
        {
            path: '',
            component: require('@/layouts/admin/default/').default,
            children: [
                {
                    path: '/home-admin',
                    name: 'home-admin',
                    components: {
                        default: require('@/pages/admin/dashboard').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                },
                {
                    path: '/calls-admin/',
                    name: 'calls-admin',
                    components: {
                        default: require('@/pages/admin/calls').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/terminals-admin/',
                    name: 'terminals-admin',
                    components: {
                        default: require('@/pages/admin/terminals').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/users-admin/',
                    name: 'users-admin',
                    components: {
                        default: require('@/pages/admin/users').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/statistics-admin/',
                    name: 'stat-admin',
                    components: {
                        default: require('@/pages/admin/stat').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/operator-admin/:id',
                    name: 'user-fullstory-admin',
                    components: {
                        default: require('@/pages/admin/user-fullstory').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/add-new-operator/',
                    name: 'add-new-operator',
                    components: {
                        default: require('@/pages/admin/add-new-operator').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/detail/:id',
                    name: 'terminal-fullstory-admin',
                    components: {
                        default: require('@/pages/operator/terminal-fullstory').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/edit-profile/',
                    name: 'edit-info-admin',
                    components: {
                        default: require('@/pages/admin/edit-info-admin').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
            ]
        },
    ]
})
