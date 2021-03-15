import {apiGetAllLangs} from '@/api'

export default {
    namespaced: true,
    state: {
        langs: []
    },
    getters: {
    },
    mutations: {
        SET_LANGS(state, payload) {
            state.langs = payload
        }
    },
    actions: {
        async stGetAllLangs({commit}) {
            // commit('TOGGLE_STAT_LOADING')
            let isSuccess = false
            try {
                const response = await apiGetAllLangs()
                commit('SET_LANGS', response.data);
                isSuccess = Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK';
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                // commit('TOGGLE_STAT_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        }
    }
}
