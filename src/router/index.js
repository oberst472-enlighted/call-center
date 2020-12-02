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
                    path: '/detail-call/:id',
                    name: 'detail-call_operator',
                    components: {
                        default: require('@/pages/operator/detail-call').default,
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
                    path: 'admin/home',
                    name: 'home_admin',
                    components: {
                        default: require('@/pages/admin/dashboard').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    },
                },
                {
                    path: 'admin/calls/',
                    name: 'calls_admin',
                    components: {
                        default: require('@/pages/admin/calls').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: 'admin/terminals/',
                    name: 'terminals_admin',
                    components: {
                        default: require('@/pages/admin/terminals').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: 'admin/users/',
                    name: 'users_admin',
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
                    path: 'admin/create-operator/',
                    name: 'create-operator_admin',
                    components: {
                        default: require('@/pages/admin/create-operator').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: '/edit-profile-admin/',
                    name: 'edit-info-admin',
                    components: {
                        default: require('@/pages/admin/edit-info-admin').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: 'admin/detail-call/:id',
                    name: 'detail-call_admin',
                    components: {
                        default: require('@/pages/admin/detail-call').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                // {
                //     path: '/detail-call-admin/:id',
                //     name: 'detail-terminal-admin',
                //     components: {
                //         default: require('@/pages/admin/detail-call').default,
                //         header: require('@/components/sections/header-admin/').default,
                //         aside: require('@/components/sections/aside/').default,
                //     }
                // },
                {
                    path: 'admin/detail-operator/:id',
                    name: 'detail-operator_admin',
                    components: {
                        default: require('@/pages/admin/detail-operator').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
                {
                    path: 'admin/detail-terminal/:id',
                    name: 'detail-terminal_admin',
                    components: {
                        default: require('@/pages/admin/detail-terminal').default,
                        header: require('@/components/sections/header-admin/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                },
            ]
        },
    ]
})
