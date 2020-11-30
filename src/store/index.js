import Vue from 'vue';
import Vuex from 'vuex';



import popup from './popup';
import middleware from './modules/middleware';
import login from './modules/login';
import users from './modules/users';
import stat from './modules/stat';
import calls from './modules/calls';
import formData from './modules/form-data';
import csv from './modules/csv';
import media from './modules/media';
import alerts from './modules/alerts'
// import socket from './modules/socket';
import webrtc from './modules/webrtc'
import sessions from './modules/sessions';
import devices from './modules/devices';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isAsideActive: false,
        isProgressActive: false,
        isConnected: false
    },
    mutations: {
        TOGGLE_ASIDE_ACTIVE(state, payload = true) {
            state.isAsideActive = payload;
        },
        TOGGLE_PROGRESS_ACTIVE(state, payload = true) {
            state.isProgressActive = payload;
        },
        TOGGLE_IS_CONNECTED(state, payload = true) {
            state.isConnected = payload;
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
        devices,
        formData,
        media,
        csv,
    },
});
