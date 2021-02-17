/* eslint-disable */
import {customLog} from '@/utils/console-group'

export default {
    namespaced: true,
    state: {
        constraints: {
            iceServers: [
                {urls: 'stun:vc-dev.enlighted.ru:3478'},
                {
                    urls: 'turn:vc-dev.enlighted.ru:3478',
                    username: 'tab1',
                    credential: '123456',
                },
            ],
        },
        offerOptions: {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
        },
        mediaOptions: {
            audio: true,
            video: true
        },

        peer: null,

        userStream: null,
        partnerStream: null,

        isNavigatorOnceConnection: false, //флаг для того чтобы не открывать сокет соединение пи переходах между роутами

    },
    mutations: {
        SET_PEER_CONNECTION(state, payload) {
            state.peer = payload
        },
        SET_IS_NAVIGATOR_ONCE_CONNECTION(state, payload) {
            state.isNavigatorOnceConnection = payload
        },
        SET_PARTNER_STREAM(state, payload) {
            state.partnerStream = payload
        },
        SET_USER_STREAM(state, payload) {
            state.userStream = payload
        },
        TOGGLE_CAMERA(state, payload = true) {
            state.userStream.getTracks().forEach(item => {
                if (item.kind === 'video') {
                    item.enabled = payload
                }
            })
        },
        TOGGLE_AUDIO(state, payload = true) {
            state.userStream.getTracks().forEach(item => {
                if (item.kind === 'audio') {

                    item.enabled = payload
                }
            })
        },
    },
    actions: {
        async stCreatePeer({state, commit, dispatch, rootState}) {

            const peer = await new RTCPeerConnection(state.constraints)

            commit('SET_PEER_CONNECTION', peer)

            state.peer.addEventListener('icecandidate', e => {
                if (e.candidate) {
                    const data = {
                        to: rootState.webrtc.webrtcSockets.clientChannel,
                        message_data: {
                            event: 'ice-candidate',
                            data: {
                                event: 'ice-candidate',
                                candidate: e.candidate,
                            }
                        }
                    }

                    dispatch(
                        'webrtc/webrtcSockets/stSendMessage',
                        {eventName: 'message_to', data},
                        {root: true}
                    )
                    console.log(e.candidate)
                }
            })

            state.peer.addEventListener('track', e => {
                if (e) {
                    commit('SET_PARTNER_STREAM', e.streams[0])
                    customLog('track', 'Монтирование видео партнера')
                } else {
                    customLog('track', e, 'red')
                }
            })
        },

        async stCreateAnswer({state, commit, dispatch, rootState}, payload) {
            await dispatch('stCreatePeer')
            const desc = await new RTCSessionDescription(payload.sdp)
            state.userStream.getTracks().forEach(track => state.peer.addTrack(track, state.userStream))

            //передаем offer терминала в в webRTC с помощью setRemoteDescription
            await state.peer.setRemoteDescription(desc)

            const answer = await state.peer.createAnswer()
            await state.peer.setLocalDescription(answer)
            const data = {
                to: rootState.webrtc.webrtcSockets.clientChannel,
                message_data: {
                    event: 'answer',
                    data: {
                        sdp: state.peer.localDescription
                    }
                }
            }
            dispatch(
                'webrtc/webrtcSockets/stSendMessage',
                {eventName: 'message_to', data},
                {root: true}
            )
        },

        stHandleNewICECandidateMsg({state}, payload) {
            const candidate = new RTCIceCandidate(payload)
            try {
                state.peer.addIceCandidate(candidate)
            } catch (e) {
                customLog('stHandleNewICECandidateMsg', e, 'red')
            }
        },


        stClosePeerConnection({state, commit, dispatch}) {
            // if(state.peer) {
                state.peer.close()
            // }
            // if (state.userStream) {
                state.userStream.getTracks().forEach(track => {
                    track.stop()
                })
            // }
            commit('SET_PEER_CONNECTION', null)
            commit('SET_USER_STREAM', null)
            commit('SET_PARTNER_STREAM', null)
            setTimeout(() => {
                dispatch('getMedia')
            }, 500)
        },
        stDisconnectWebrtc({state, commit, dispatch}) {
            if(state.peer) {
                state.peer.close()
            }
            if (state.userStream) {
                state.userStream.getTracks().forEach(track => {
                    track.stop()
                })
            }
            commit('SET_PEER_CONNECTION', null)
            commit('SET_USER_STREAM', null)
            commit('SET_PARTNER_STREAM', null)
            setTimeout(() => {
                dispatch('getMedia')
            }, 500)
        },
        async getMedia({state, commit}) {
            const stream = await navigator.mediaDevices.getUserMedia(state.mediaOptions)
            commit('SET_USER_STREAM', stream)

        },



    }
}
