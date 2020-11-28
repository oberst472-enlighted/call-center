import webrtcCalls from './webrtc-calls'
import webrtcSockets from './webrtc-socket'
import webrtcPeerConnection from './webrtc-peer-connection'


export default {
    namespaced: true,
    state: {
    },
    mutations: {},
    getters: {},
    actions: {
    },
    modules: {
        webrtcCalls,
        webrtcSockets,
        webrtcPeerConnection
    }
};
