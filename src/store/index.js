import Vue from 'vue';
import Vuex from 'vuex';
import callLogic from './callLogic';
import popup from './popup';
import apiRequest from '../utils/apiRequest';
import login from './modules/login';
import alerts from './modules/alerts';
import users from './modules/users';
import stat from './modules/stat';
import calls from './modules/calls';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isBgActive: false,
        totalTime: 0, //
        workStatus: null,
        userStatus: null,
        isActiveWorkShift: false,
        userData: null,
        callsOperator: null,
        isAsideActive: false
    },
    mutations: {
        TOGGLE_BG_ACTIVE(state, payload = true) {
            state.isBgActive = payload;
        },
        TOGGLE_ASIDE_ACTIVE(state, payload = true) {
            state.isAsideActive = payload;
        },
        incrementTime(state) {
            state.totalTime += 1;
            localStorage.setItem('totalTime',
                +localStorage.getItem('totalTime') + +1);
        },
        cleanTime(state) {
            state.totalTime = 0;
            localStorage.setItem('totalTime', 0);
        },
        setTime(state, time) {
            state.totalTime = time;
        },
        toggleWorkingStatus(state, type) {
            localStorage.setItem('workStatus', type);
            state.workStatus = type;
        },
        closeSession(state) {
            state.workStatus = 'break';
            localStorage.setItem('workStatus', 'break');
        },
        setUserStatus(state, type) {
            state.userStatus = type;
        },
        setWorkShiftStatus(state, status) {
            state.isActiveWorkShift = status;
            localStorage.setItem('isActiveWorkShift', status);
        },
        setUserData(state, data) {
            state.userData = data;
        },
        updateUserData(state, { firstName, lastName, phone, email }) {
            state.userData.user.firstName = firstName;
            state.userData.user.lastName = lastName;
            state.userData.user.phone = phone;
            state.userData.user.email = email;
        }
    },
    getters: {
        getCallCenterId() {
            return (
                localStorage.getItem('callCenterId') ||
                sessionStorage.getItem('callCenterId')
            );
        },
        getIsRoleOperator() {
            return (
                localStorage.getItem('userType') === 'operator' ||
                sessionStorage.getItem('userType') === 'operator'
            );
        },
        getUserId() {
            return (
                localStorage.getItem('userId') ||
                sessionStorage.getItem('userId')
            );
        }
    },
    actions: {
        startWorkShift({ commit }) {
            commit('setWorkShiftStatus', true);
            commit('toggleWorkingStatus', 'online');
        },
        endWorkShift({ commit }) {
            commit('setWorkShiftStatus', false);
            commit('toggleWorkingStatus', 'break');
            commit('cleanTime');
        },
        async logIn({ commit, dispatch }, data) {
            console.log('logggin');
            localStorage.clear();
            sessionStorage.clear();
            let auth;
            try {
                auth = await apiRequest.post('/api/auth/', {
                    username: data.login,
                    password: data.password
                });
            } catch (e) {
                return true;
            }
            let userInfo = await apiRequest.get(`/api/users/${auth.data.userId}/`);

            localStorage.setItem('username', userInfo.data.user.username);
            localStorage.setItem('callCenterId',
                userInfo.data.user.callCenterId);

            if (auth.status === 200 && auth.data.auth) {
                if (data.rememberMe) {
                    localStorage.setItem('isUserLoggedIn', true);
                    localStorage.setItem('token', auth.data.token);
                    localStorage.setItem('userType',
                        userInfo.data.user.userType.toLowerCase());
                    localStorage.setItem('userId', auth.data.userId);

                    commit('setUserStatus',
                        userInfo.data.user.userType.toLowerCase());
                } else {
                    sessionStorage.setItem('isUserLoggedIn', true);
                    sessionStorage.setItem('token', auth.data.token);
                    sessionStorage.setItem('userType',
                        userInfo.data.user.userType.toLowerCase());
                    localStorage.setItem('userId', auth.data.userId);

                    commit('setUserStatus',
                        userInfo.data.user.userType.toLowerCase());
                }
                if (userInfo.data.user.userType.toLowerCase() === 'operator') {
                    localStorage.setItem('userType',
                        userInfo.data.user.userType.toLowerCase());
                }
                await dispatch('fetchUserData');

                const userSessionData = userInfo.data.session;
                if (userSessionData) {
                    if (userSessionData.stopTime) {
                        await apiRequest.patch(`/api/users/${localStorage.getItem('userId')}/start-session/`);
                        dispatch('startWorkShift');
                    }
                }

                // commit('toggleWorkingStatus', 'break')
                // commit('setWorkShiftStatus', false)
            }
        },
        async logOut({ state }) {
            // clearing all storages
            localStorage.clear();
            sessionStorage.clear();
        },
        async fetchUserData({ commit }) {
            if (
                localStorage.getItem('userType') &&
                localStorage.getItem('userType') === 'operator'
            ) {
                let userInfo;
                try {
                    userInfo = (await apiRequest.get(`/api/me/`)).data;
                } catch (e) {
                    console.log(e);
                }
                if (userInfo.session) {
                    if (!userInfo.session.stopTime) {
                        // console.log(Date(userInfo.session.stopTime).getTime() - Date(userInfo.session.startTime).getTime())

                        commit('setWorkShiftStatus', true);
                        // commit('toggleWorkingStatus', 'break')
                    } else {
                        commit('setWorkShiftStatus', false);
                    }
                }
                commit('setUserData', userInfo);
            } else {
                let userInfo = (
                    await apiRequest.get(`/api/users/${localStorage.getItem('userId')}/`)
                ).data;

                commit('setUserData', userInfo);
            }
        },
        async updateWorkingShiftStats({ state, dispatch }) {
            dispatch('fetchStats');
            dispatch('fetchCallsOperator');
        },
        async fetchCallsOperator({ state }) {
            let userId =
                localStorage.getItem('userId') ||
                sessionStorage.getItem('userId');
            state.callsOperator = (
                await apiRequest.get(`/api/users/${userId}/calls/`)
            ).data;
        },
        async fetchStats({ state }) {
            const userInfo = (await apiRequest.get(`/api/me/`)).data;
            state.userData.lastSessionStat = userInfo.lastSessionStat;
        }
    },
    modules: {
        callLogic,
        popup,
        login,
        alerts,
        users,
        stat,
        calls
    }
});
