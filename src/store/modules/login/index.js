import {apiLogin, apiResetPassword, apiGetAllPasswordResetRequests} from '@/api'

export default {
    namespaced: true,
    state: {
        stat: null,
        passwordResetRequests: []
    },
    getters: {},
    mutations: {
        setStat(state, payload) {
            state.stat = payload
        },
        SET_ALL_PASSWORD_RESET_REQUESTS(state, payload) {
            state.passwordResetRequests = payload
            console.log(payload)
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
        async stResetPassword(context, form) {
            const response = await apiResetPassword(form)
            console.log(response)
            if (Boolean(response) && response.status < 300 && response.statusText === 'Created') {
                return {isSuccess: true, response}
            } else {
                return {isSuccess: false}
            }
        },
        async stGetAllPasswordResetRequests({commit}, form) {
            const response = await apiGetAllPasswordResetRequests(form)
            console.log(response.data)
            if (Boolean(response) && response.status < 300 && response.statusText === 'OK') {
                commit('SET_ALL_PASSWORD_RESET_REQUESTS', response.data)
                return true
            } else {
                return false
            }
        }

    }
}
