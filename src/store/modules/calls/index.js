import {apiGetAllCallsForASession, apiGetAllCallsById, apiSendACommentToTheCall, apiGetAllCalls, apiGetDetailCallInfo} from '@/api'

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
        allCallsUserById: [],
        allCalls: [],
        detailInfo: [],

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
        SET_DETAIL_INFO(state, payload) {
            state.detailInfo = payload
        },
        SET_ALL_CALLS_USER_BY_ID(state, payload) {
            state.allCallsUserById = payload
        },
        SET_ALL_CALLS(state, payload) {
            state.allCalls = payload
        },
    },
    actions: {
        async stGetAllCallsForTheCurrentSession({state, commit}) {
            commit('TOGGLE_CALLS_PER_SHIFT_LOADING')
            let isSuccess = false
            try {
                const response = await apiGetAllCallsForASession(state.callsPerShift.filters)
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
        async stGetAllCalls({commit}) {
            let isSuccess = false
            try {
                const response = await apiGetAllCalls()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    // commit('SET_CALLS_PER_SHIFT_NOT_PAGINATION', false)
                    commit('SET_ALL_CALLS', response.data.results);
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
        //все звонки конкретного пользователя
        async stGetAllCallsByUserId({commit}, id) {

            let isSuccess = false
            try {
                const response = await apiGetAllCallsById({params: null, id: id})
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    // commit('SET_CALLS_PER_SHIFT_NOT_PAGINATION', false)
                    commit('SET_ALL_CALLS_USER_BY_ID', response.data.results);
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

        async stGetDetailCallInfo({commit}, id) {
            let isSuccess = false
            try {
                const response = await apiGetDetailCallInfo(id)
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    isSuccess = true

                    commit('SET_DETAIL_INFO', response.data)
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                // commit('TOGGLE_CALLS_PER_SHIFT_LOADING', false)
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
