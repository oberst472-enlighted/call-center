export default {
    namespaced: true,
    state: {
        callID: '',
        videoToken: '',
        videoID: '',
        isCallMelodyActive: false,
        isIncomingCall: false
    },
    getters: {
    },
    mutations: {
        getSocket(state, payload) {
            state.socket = payload
            console.log(payload)
        },
        TOGGLE_CALL_MELODY(state, payload = true) {
            state.isCallMelodyActive = payload
        },
        TOGGLE_INCOMING_CALL(state, payload = true) {
            state.isIncomingCall = payload
        },

    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        incomingCall({commit}, payload) {
            this.callID = payload.call_id
            this.videoToken = payload['video_token']
            this.videoID = payload['video_id']
        }
    }
}
