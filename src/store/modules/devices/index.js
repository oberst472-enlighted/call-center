import {apiGetDetailTerminalInfoById, apiGetDevices} from '@/api'

export default {
    namespaced: true,
    state: {
        items: [],
        filters: {
            page: 1
        },
        isNotDevicesPagination: false,
        isDevicesLoading: false,
        detailTerminalInfo: null
    },
    mutations: {
        TOGGLE_DEVICES_LOADING(state, payload = true) {
            state.isDevicesLoading = payload
        },
        RESET_DEVICES_FILTERS(state) {
            state.filters = {
                page: 1
            }
            state.isNotDevicesPagination = false
        },
        SET_DEVICES(state, payload) {
            if (state.items.length) {
                payload ? state.items = [...state.items, ...payload] : state.items = []
            }
            else {
                state.items = payload
            }
        },
        SET_DEVICES_NO_PAGINATION(state, payload) {
            state.items = payload
        },
        SET_DEVICES_NOT_PAGINATION(state, payload = true) {
            state.isNotDevicesPagination = payload
        },
        SET_DEVICES_PAGINATION_PAGE(state, payload = 1) {
            payload !== 0 ? state.filters.page ++ : state.filters.page = 1
        },
        SET_TERMINAL_DETAIL_INFO(state, payload) {
            state.detailTerminalInfo = payload
        },

    },
    actions: {
        async stGetDevices({state, commit}) {
            commit('TOGGLE_DEVICES_LOADING')
            let isSuccess = false
            try {
                const response = await apiGetDevices(state.filters)
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('SET_DEVICES_NO_PAGINATION', response.data.results)
                    // commit('SET_DEVICES', response.data.results);
                    // response.data.next ? commit('SET_DEVICES_NOT_PAGINATION', false) : commit('SET_DEVICES_NOT_PAGINATION')
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_DEVICES_LOADING', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        },

        async stGetDetailTerminalInfoById({commit}, id) {
            let isSuccess = false
            try {
                const response = await apiGetDetailTerminalInfoById(id)
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    isSuccess = true

                    commit('SET_TERMINAL_DETAIL_INFO', response.data)
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

    }
}
