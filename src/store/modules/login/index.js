import {apiLogin} from '@/api'

export default {
    namespaced: true,
    state: {
        stat: null
    },
    getters: {
    },
    mutations: {
        setStat(state, payload) {
            state.stat = payload
        }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        async stLogin({commit}, form) {
            console.log(77)
            const response = await apiLogin(form)
            if (Boolean(response) && response.status < 300 && response.statusText === 'OK') {
                console.log(response)
                return true
            }
            else {
                return false
            }
        }
    }
}
