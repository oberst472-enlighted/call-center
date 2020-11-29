import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL
    routes: [
        // {
        //     component: require('../layouts/main').default,
        //     path: '/',
        //     name: 'main'
        // },
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
                    path: '/home',
                    name: 'home-admin',
                    components: {
                        default: require('@/pages/admin/dashboard').default,
                        header: require('@/components/sections/header-operator/').default,
                        aside: require('@/components/sections/aside/').default,
                    }
                }
            ]
        },
        // {
        //     path: '',
        //     component: require('@/layouts/manager/default').default,
        //     children: [
        //         {
        //             path: '/manager/create-task',
        //             name: 'create-task-manager',
        //             meta: {
        //                 title: 'Новая задача'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/create-task').default
        //             }
        //         },
        //         {
        //             path: '/manager/edit-task/:id',
        //             name: 'edit-task-manager',
        //             meta: {
        //                 title: 'Редактировать задачу'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/edit-task').default
        //             }
        //         },
        //         {
        //             path: '/manager/create-place',
        //             name: 'create-place-manager',
        //             meta: {
        //                 title: 'Новое место'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/create-place').default
        //             }
        //         },
        //         {
        //             path: '/manager/create-user',
        //             name: 'create-user-manager',
        //             meta: {
        //                 title: 'Новый сотрудник'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/create-user').default
        //             }
        //         },
        //         {
        //             path: '/manager/all-users',
        //             name: 'all-users-manager',
        //             meta: {
        //                 title: 'Все сотрудники'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/users').default
        //             }
        //         },
        //         {
        //             path: '/manager/tasks/:id',
        //             name: 'detail-task-manager',
        //             components: {
        //                 header: require('@/components/sections/header/manager/detail-task').default,
        //                 default: require('@/pages/manager/detail-task').default
        //             }
        //         },
        //         {
        //             path: '/manager/statistics',
        //             name: 'statistics-manager',
        //             meta: {
        //                 title: 'Общая статистика'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/statistics').default
        //             }
        //         },
        //         {
        //             path: '/manager/edit-user/',
        //             name: 'edit-user',
        //             meta: {
        //                 title: 'Редактировать профиль'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/edit-user').default
        //             }
        //         }
        //     ]
        // },
        // {
        //     path: '',
        //     component: require('@/layouts/manager/user').default,
        //     children: [
        //         {
        //             path: '/manager/users/:id',
        //             name: 'detail-user-manager',
        //             components: {
        //                 header: require('@/components/sections/header/manager/default').default,
        //                 default: require('@/pages/manager/detail-user').default
        //             }
        //         }
        //     ]
        // },
        // {
        //     path: '',
        //     component: require('@/layouts/manager/map').default,
        //     children: [
        //         {
        //             path: '/manager/map',
        //             name: 'map-manager',
        //             components: {
        //                 header: require('@/components/sections/header/manager/map').default,
        //                 default: require('@/pages/manager/map').default
        //             }
        //         }
        //     ]
        // },
        // {
        //     path: '',
        //     component: require('@/layouts/manager/tasks').default,
        //     children: [
        //         {
        //             path: 'manager/tasks/',
        //             name: 'tasks-manager',
        //             components: {
        //                 header: require('@/components/sections/header/manager/tasks').default,
        //                 default: require('@/pages/manager/tasks').default
        //             }
        //         }
        //     ]
        // },
        // {
        //     path: '',
        //     component: require('@/layouts/supervisor/default').default,
        //     children: [
        //         {
        //             path: '/supervisor/dashboard/',
        //             name: 'dashboard-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/dashboard').default,
        //                 default: require('@/pages/supervisor/dashboard').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/map/',
        //             name: 'map-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/map').default,
        //                 default: require('@/pages/supervisor/map').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/users/:id',
        //             name: 'users-supervisor',
        //             meta: {
        //                 title: 'Сотрудники'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/users').default,
        //                 default: require('@/pages/supervisor/users').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/create/',
        //             name: 'create-user-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/create-user').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/create-user/',
        //             name: 'create-contractor-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/create-contractor').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/all-places',
        //             name: 'all-places-supervisor',
        //             meta: {
        //                 title: 'Список мест'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/places').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/organisations',
        //             name: 'organisations-supervisor',
        //             meta: {
        //                 title: 'Организации'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/organisations').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/organisations/:id',
        //             name: 'detail-organisation-supervisor',
        //             meta: {
        //                 title: 'Организация'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/detail-organisation').default,
        //                 default: require('@/pages/supervisor/detail-organisation').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/create-place',
        //             name: 'create-place-supervisor',
        //             meta: {
        //                 title: 'Новое место'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/create-place').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/edit-place/:id',
        //             name: 'edit-place-supervisor',
        //             meta: {
        //                 title: 'Редактировать место'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/edit-place').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/edit-organisation/:id',
        //             name: 'edit-organisation-supervisor',
        //             meta: {
        //                 title: 'Редактировать организацию'
        //             },
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/edit-organisation').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/tasks/:id',
        //             name: 'detail-task-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/detail-task').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/create-task',
        //             name: 'create-task-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/tasks-group/create-task').default
        //             }
        //         },
        //         {
        //             path: '/supervisor/edit-user/',
        //             name: 'edit-user-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/edit-user').default
        //             }
        //         }
        //     ]
        //
        // },
        // {
        //     path: '',
        //     component: require('@/layouts/supervisor/user').default,
        //     children: [
        //         {
        //             path: '/supervisor/user/:id',
        //             name: 'detail-user-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/default').default,
        //                 default: require('@/pages/supervisor/detail-user').default
        //             }
        //         }
        //     ]
        //
        // },
        // {
        //     path: '',
        //     component: require('@/layouts/supervisor/tasks').default,
        //     children: [
        //         {
        //             path: '/supervisor/all-tasks/',
        //             name: 'all-tasks-supervisor',
        //             components: {
        //                 header: require('@/components/sections/header/supervisor/filters').default,
        //                 default: require('@/pages/supervisor/tasks-group/tasks').default
        //             }
        //         }
        //     ]
        //
        // },
        //
        // {
        //     path: '/404',
        //     name: 'error',
        //     component: require('../layouts/error').default
        // },
        // {
        //     path: '/logout',
        //     name: 'logout',
        //     components: {
        //         default: require('../layouts/logout').default
        //     }
        // },
        // {
        //     path: '*',
        //     name: 'not-component',
        //     components: {
        //         default: require('../layouts/error').default
        //     }
        // }

    ]
})


// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// const routes = [
//   {
//     path: '/',
//     redirect: '/dashboard'
//   },
//   {
//     path: '/login',
//     name: 'login',
//     meta: {
//       layout: 'empty-layout',
//       gotForward: true,
//       middleware: [guest]
//     },
//     component: () => import('../views/Login.vue')
//   },
//   {
//     path: '/restore-pass',
//     name: 'restore-pass',
//     meta: {
//       layout: 'empty-layout',
//       gotForward: true,
//       middleware: [guest]
//     },
//     component: () => import('../views/RestorePass')
//   },
//   {
//     path: '/dashboard',
//     name: 'dashboard',
//     meta: {
//       layout: 'main-layout',
//       gotForward: false,
//       middleware: [user]
//     },
//     component: () => import('../pages/admin/dashboard/')
//   },
//   {
//     path: '/profile',
//     name: 'profile',
//     meta: {
//       layout: 'main-layout',
//       gotForward: false,
//       middleware: [operator]
//     },
//     component: () => import('../views/OperatorProfile.vue')
//   },
//   {
//     path: '/call-list',
//     name: 'call-list',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/call/CallList.vue')
//   },
//
//   {
//     path: '/call-list/:id',
//     name: 'single-call',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/call/SingleCall.vue')
//   },
//   {
//     path: '/call-terminals',
//     name: 'call-terminals',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/terminal/CallTerminals.vue')
//   },
//   {
//     path: '/call-terminals/:id',
//     name: 'single-terminal',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/terminal/SingleTerminal.vue')
//   },
//   {
//     path: '/operator-list',
//     name: 'operator-list',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/operators/OperatorsList')
//   },
//   {
//     path: '/operator-list/:id',
//     name: 'operator-page',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/operators/OperatorPage')
//   },
//   {
//     path: '/operator-list/:id/edit',
//     name: 'operator-edit',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/operators/OperatorEdit')
//   },
//   {
//     path: '/statistics',
//     name: 'statistics',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../views/Statistics')
//   },
//   {
//     path: '/create-operator',
//     name: 'create-operator',
//     meta: {
//       layout: 'main-layout',
//       gotForward: true,
//       middleware: [user, admin]
//     },
//     component: () => import('../views/OperatorNew')
//   },
//   {
//     path: '/test-call',
//     name: 'test-call',
//     meta: {
//       layout: 'test-call-layout',
//       gotForward: true,
//       middleware: [user]
//     },
//     component: () => import('../layouts/testCallLayout')
//   },
//   // {
//   //   path: '/add-language',
//   //   name: 'add-language',
//   //   meta: { layout: "main-layout", gotForward: true, middleware: [ user, admin ]},
//   //   component: () => import('../views/AddLanguage')
//   // },
// ]
//
//
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
//
// router.beforeEach((to, from, next) => {
//   if (!to.meta.middleware) {
//     return next()
//   }
//   const middleware = to.meta.middleware
//   const context = {
//     to,
//     from,
//     next,
//     store
//   }
//   return middleware[0]({
//     ...context,
//     next: middlewarePipeline(context, middleware, 1)
//   })
// })
//
// export default router
