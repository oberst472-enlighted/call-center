import {apiGetStatForTheSession, apiGetAdminStat} from '@/api'

export default {
    namespaced: true,
    state: {
        statForTheSession: null,
        adminStat: null,
        statLoading: false
    },
    getters: {
    },
    mutations: {
        TOGGLE_STAT_LOADING(state, payload) {
            state.statLoading = payload
        },
        SET_STAT_FOR_THE_SESSION(state, payload) {
            state.statForTheSession = payload
        },
        SET_ADMIN_STAT(state, payload) {
            state.adminStat = payload
        }
    },
    actions: {
        async stGetStatForTheSession({commit}) {
            commit('TOGGLE_STAT_LOADING')
            let isSuccess = false
            try {
                const response = await apiGetStatForTheSession()
                commit('SET_STAT_FOR_THE_SESSION', response.data);
                isSuccess = Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK';
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_STAT_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        },
        async stGetAdminStat({commit}) {
            commit('TOGGLE_STAT_LOADING')
            let isSuccess = false
            try {
                const response = await apiGetAdminStat()
                commit('SET_ADMIN_STAT', response.data);
                isSuccess = Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK';
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_STAT_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        }
    }
}
