import {apiLogin} from '@/api'

export default {
    namespaced: true,
    state: {
        stat: null
    },
    getters: {},
    mutations: {
        setStat(state, payload) {
            state.stat = payload
        }
    },
    actions: {
        async stLogin(context, form) {
            const response = await apiLogin(form)
            if (Boolean(response) && response.status < 300 && response.statusText === 'OK') {
                return {isSuccess: true, response}
            } else {
                return {isSuccess: false}
            }
        },
        async stLogout(context, form) {
            const response = await apiLogin(form)
            if (Boolean(response) && response.status < 300 && response.statusText === 'OK') {
                return {isSuccess: true, response}
            } else {
                return {isSuccess: false}
            }
        }
    }
}
