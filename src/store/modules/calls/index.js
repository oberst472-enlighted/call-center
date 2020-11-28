import {apiGetAllCallsPerWorkShift, apiSendACommentToTheCall} from '@/api'

export default {
    namespaced: true,
    state: {
        callsPerShift: {
            callsPerShift: [],
            isLoading: true,
            filters: {
                page: 1
            },
            isNotPagination: false,
            calls: []
        },

        isCallsLoading: true,
        isCommentLoading: false
    },
    getters: {
    },
    mutations: {
        SET_SESSIONS_NO_PAGINATION(state, payload) {
            state.callsPerShift.calls = payload
        },
        TOGGLE_CALLS_PER_SHIFT_LOADING(state, payload = true) {
            state.callsPerShift.isLoading = payload
        },
        RESET_PER_SHIFT_FILTERS(state) {
            state.callsPerShift.filters = {
                page: 1
            }
            state.isNotPagination = false
        },
        SET_CALLS_PER_SHIFT(state, payload) {
            if (state.callsPerShift.calls.length) {
                payload ? state.callsPerShift.calls = [...state.callsPerShift.calls, ...payload] : state.callsPerShift.calls = []
            }
            else {
                state.callsPerShift.calls = payload
            }
        },
        SET_CALLS_PER_SHIFT_NOT_PAGINATION(state, payload = true) {
            state.callsPerShift.isNotPagination = payload
        },
        SET_PAGINATION_PAGE(state, payload = 1) {
            payload !== 0 ? state.callsPerShift.filters.page ++ : state.callsPerShift.filters.page = 1
        },
        TOGGLE_COMMENT_LOADING(state, payload = true) {
            state.isCommentLoading = payload
        },
        // RESET_CALLS_STATE(state) {
        //     state.callsPerShift.callsPerShift = []
        //     state.callsPerShift.isLoading = []
        //     state.callsPerShift.filters = []
        //     state.callsPerShift.page = []
        //     state.isNotPagination = false
        //     state.calls = []
        //
        //     state.isCallsLoading = true
        //     state.isCommentLoading = false
        // }

    },
    actions: {
        async stGetCallsPerWorkShift({state, commit}) {
            commit('TOGGLE_CALLS_PER_SHIFT_LOADING')
            let isSuccess = false
            try {
                const response = await apiGetAllCallsPerWorkShift(state.callsPerShift.filters)
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('SET_SESSIONS_NO_PAGINATION', response.data.results)
                    // commit('SET_CALLS_PER_SHIFT_NOT_PAGINATION', false)
                    // commit('SET_CALLS_PER_SHIFT', response.data.results);
                    // response.data.next ? commit('SET_CALLS_PER_SHIFT_NOT_PAGINATION', false) : commit('SET_CALLS_PER_SHIFT_NOT_PAGINATION')
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_CALLS_PER_SHIFT_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        },

        async stSendACommentToTheCall({commit}, {callID, info}) {
            commit('TOGGLE_COMMENT_LOADING')
            let isSuccess = false
            try {
                const response = await apiSendACommentToTheCall({callID, info})
                isSuccess = Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK';
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_COMMENT_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        }
    }
}
