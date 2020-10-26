import {apiGetStat} from '@/api'

export default {
    namespaced: true,
    state: {
        stat: []
    },
    getters: {
    },
    mutations: {
        setStat(state, payload) {
            state.stat = payload
        }
    },
    actions: {
        async stGetStat({commit}, id) {
            const response = await apiGetStat(id)
            if(Boolean(response) && response.status < 300 && response.statusText === 'OK') {
                commit('setStat', response.data)
                return true
            }
            else {
                return false
            }
        }
    }
}
