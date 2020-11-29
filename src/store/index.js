import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'



import popup from './popup';
import middleware from './modules/middleware';
import login from './modules/login';
import alerts from './modules/alerts';
import users from './modules/users';
import stat from './modules/stat';
import calls from './modules/calls';
import formData from './modules/form-data';
import media from './modules/media';
// import socket from './modules/socket';
import webrtc from './modules/webrtc'
import sessions from './modules/sessions';
import terminals from './modules/terminals';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAsideActive: false
    },
    mutations: {
        TOGGLE_ASIDE_ACTIVE(state, payload = true) {
            state.isAsideActive = payload;
        },
    },
    actions: {
    },
    modules: {
        popup,
        middleware,
        login,
        alerts,
        users,
        stat,
        calls,
        // socket,
        webrtc,
        sessions,
        terminals,
        formData,
        media
    },
    plugins: [
        createPersistedState({
            // storage: window.sessionStorage,
            paths: ['login']
        })
    ]
});
