import {apiStartSession, apiGetCurrentSessionInfo, apiStopSession, apiStartSessionBreak, apiStopSessionBreak} from '@/api'
export default {
    namespaced: true,
    state: {
        isSessionBreak: false,
        isSessionActive: false,
        sessionId: '',
        startSessionTime: '',

    },
    getters: {
    },
    mutations: {
        TOGGLE_SESSION_ACTIVE(state, payload = true) {
            state.isSessionActive = payload
        },
        SET_SESSION_ID(state, payload) {
            state.sessionId = payload
        },
        SET_START_SESSION_TIME(state, payload) {
            state.startSessionTime = payload
        },
        TOGGLE_SESSION_BREAK(state, payload = true) {
            state.isSessionBreak = payload
        }

    },
    actions: {
        async stStartSession({commit}) {
            let isSuccess = false
            try {
                const response = await apiStartSession()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('TOGGLE_SESSION_ACTIVE');
                    commit('SET_SESSION_ID', response.data.id);
                    commit('SET_START_SESSION_TIME', response.data['start_time']);
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
        async stStopSession({commit}) {
            let isSuccess = false
            try {
                const response = await apiStopSession()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    commit('TOGGLE_SESSION_ACTIVE', false);
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

        async stGetCurrentSessionInfo({commit}) {
            let isSuccess = false
            try {
                const response = await apiGetCurrentSessionInfo()
                if (
                    Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK'
                ) {
                    const {id, start_time, is_break} = response.data

                    commit('TOGGLE_SESSION_ACTIVE');
                    commit('SET_SESSION_ID', id);
                    commit('SET_START_SESSION_TIME', start_time);
                    commit('TOGGLE_SESSION_BREAK', is_break);

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

        async stStartSessionBreak({commit}) {
            let isSuccess = false
            try {
                const response = await apiStartSessionBreak()
                isSuccess = Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK';
                commit('TOGGLE_SESSION_BREAK')
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess
            }
        },
        async stStopSessionBreak({commit}) {
            let isSuccess = false
            try {
                const response = await apiStopSessionBreak()
                isSuccess = Boolean(response) &&
                    response.status < 300 &&
                    response.statusText === 'OK';
            } catch (e) {
                console.error(e)
                isSuccess = false
            }
            finally {
                commit('TOGGLE_SESSION_BREAK', false)
                // eslint-disable-next-line no-unsafe-finally
                return isSuccess
            }
        },
    }
}
