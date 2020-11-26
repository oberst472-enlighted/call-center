import {apiStartWorkShift, apiGetCurrentSession, apiStopWorkShift, apiStartBreak, apiStopBreak} from '@/api'
export default {
    namespaced: true,
    state: {
        isStartWorkShift: false,
        isStopWorkShift: false,
        isStartBreak: false,
        isStopBreak: false,
        workShiftID: '', //id смены
        startWorkShiftTime: '',
    },
    getters: {
    },
    mutations: {
        TOGGLE_START_WORK_SHIFT(state, payload = true) {
            state.isStartWorkShift = payload
        },
        TOGGLE_STOP_WORK_SHIFT(state, payload = true) {
            state.isStopWorkShift = payload
        },
        SET_WORK_SHIFT_ID(state, payload) {
            state.workShiftID = payload
        },
        SET_START_WORK_SHIFT_TIME(state, payload) {
            state.startWorkShiftTime = payload
        },
        TOGGLE_START_BREAK(state, payload) {
            state.isStartBreak = payload
        },
        TOGGLE_STOP_BREAK(state, payload) {
            state.isStopBreak = payload
        },

    },
    actions: {
        async stStartWorkShift({commit}) {
            let isSuccess = false
            try {
                const response = await apiStartWorkShift()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('TOGGLE_STOP_WORK_SHIFT', false)
                    commit('TOGGLE_START_WORK_SHIFT');
                    commit('SET_WORK_SHIFT_ID', response.data.id);
                    commit('SET_START_WORK_SHIFT_TIME', response.data['start_time']);
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                    // eslint-disable-next-line no-unsafe-finally
                    return isSuccess
                }
        },
        async stStopWorkShift({commit}) {
            let isSuccess = false
            try {
                const response = await apiStopWorkShift()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('TOGGLE_START_WORK_SHIFT', false)
                    commit('TOGGLE_STOP_WORK_SHIFT')
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess
            }
        },

        async stGetCurrentSession({commit}) {
            let isSuccess = false
            try {
                const response = await apiGetCurrentSession()
                console.log(response)
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('TOGGLE_START_WORK_SHIFT');
                    commit('SET_WORK_SHIFT_ID', response.data.id);
                    commit('SET_START_WORK_SHIFT_TIME', response.data['start_time']);
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess

            }
        },

        async stStartBreak({commit}) {
            let isSuccess = false
            try {
                const response = await apiStartBreak()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('TOGGLE_STOP_BREAK', false)
                    commit('TOGGLE_START_BREAK')
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess
            }
        },
        async stStopBreak({commit}) {
            let isSuccess = false
            try {
                const response = await apiStopBreak()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('TOGGLE_START_BREAK', false)
                    commit('TOGGLE_STOP_BREAK')
                    isSuccess = true
                } else {
                    isSuccess = false
                }
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess
            }
        },
    }
}
