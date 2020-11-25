import {apiGetAllCallsPerWorkShift, apiSendACommentToTheCall} from '@/api'

export default {
    namespaced: true,
    state: {
        calls: [],
        isCallsLoading: true,
        isCommentLoading: false
    },
    getters: {
    },
    mutations: {
        SET_CALLS(state, payload) {
            state.calls = payload
        },
        TOGGLE_CALLS_LOADING(state, payload = true) {
            state.isCallsLoading = payload
        },
        TOGGLE_COMMENT_LOADING(state, payload = true) {
            state.isCommentLoading = payload
        },

    },
    actions: {
        async stGetAllCallsPerWorkShift({commit}) {
            commit('TOGGLE_CALLS_LOADING')
            let isSuccess = false
            try {
                const response = await apiGetAllCallsPerWorkShift()
                console.log(response)
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('SET_CALLS', response.data.results);
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_CALLS_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        },

        async stSendACommentToTheCall({commit}, {callID, info}) {
            console.log(61)
            commit('TOGGLE_COMMENT_LOADING')
            let isSuccess = false
            try {
                const response = await apiSendACommentToTheCall({callID, info})
                console.log(response)
                isSuccess = Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK';
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_CALLS_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        }
    }
}
