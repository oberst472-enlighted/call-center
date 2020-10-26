import {apiGetCalls} from '@/api'

export default {
    namespaced: true,
    state: {
        calls: []
    },
    getters: {
    },
    mutations: {
        setCalls(state, payload) {
            state.calls = payload
        }
    },
    actions: {
        async stGetCalls({commit}) {
            const response = await apiGetCalls()
            if(Boolean(response) && response.status < 300 && response.statusText === 'OK') {
                commit('setCalls', response.data)
                return true
            }
            else {
                return false
            }
        }
    }
}
