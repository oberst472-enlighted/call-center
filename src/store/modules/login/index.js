import {apiLogin, apiResetPassword, apiGetAllPasswordResetRequests, ApiSetNewPasswordToOperator} from '@/api'

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
            if (Boolean(response) && response.status < 300 && response.statusText === 'Created') {
                return {isSuccess: true, response}
            } else {
                return {isSuccess: false}
            }
        },
        async stSetNewPasswordToOperator(context, info) {
            const response = await ApiSetNewPasswordToOperator(info)
            if (Boolean(response) && response.status < 300 && response.statusText === 'Created') {
                return true
            } else {
                return false
            }
        },
        async stGetAllPasswordResetRequests({commit}, form) {
            const response = await apiGetAllPasswordResetRequests(form)
            if (Boolean(response) && response.status < 300 && response.statusText === 'OK') {
                commit('SET_ALL_PASSWORD_RESET_REQUESTS', response.data)
                return true
            } else {
                return false
            }
        }

    }
}
