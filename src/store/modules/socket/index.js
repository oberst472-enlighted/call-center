import {customLog} from '@/utils/console-group'
import {getJsonFromString, getStringFromJson} from '@/utils/json'

export default {
    namespaced: true,
    state: {
        options: {
            constraints: {
                // iceServers: [
                //     { urls: 'stun:stun.l.google.com:19302' },
                //     { urls: 'stun:stun1.l.google.com:19302' },
                //     { urls: 'stun:stun2.l.google.com:19302' },
                //     { urls: 'stun:stun3.l.google.com:19302' },
                //     {
                //         urls: 'turn:vc-dev.enlighted.ru:3478',
                //         username: 'tab1',
                //         credential: '123456',
                //     },
                // ],
                iceServers: [
                    {urls: 'stun:stun.l.google.com:19302'},
                    {urls: 'stun:stun1.l.google.com:19302'},
                    {urls: 'stun:stun2.l.google.com:19302'},
                    {urls: 'stun:stun3.l.google.com:19302'},
                    {urls: 'stun:stun4.l.google.com:19302'},
                    { urls: 'stun:vc-dev.enlighted.ru:3478' },
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
            }
        },
        identifiersCroup: {
            callID: '',
            videoToken: '',
            videoID: '',
        },
        clientChannel: '',

        isCallMelodyActive: false,
        isIncomingCall: false, //идет вызов от терминала
        isCallAnswered: false, //оператор снял трубку, начался разговор,
        isCallOver: false, //звонок окончен
        whoStoppedTheCall: 'user', //кто завершил звонок (user / partner)


        socket: null,
        isSocketOpen: false,
        socketRetryConnectTime: 5000,

        peer: null,
        userStream: null,
        partnerStream: null,
    },
    getters: {},
    mutations: {
        SET_SOCKET(state, payload) {
            state.socket = payload
        },
        TOGGLE_INCOMING_CALL(state, payload = true) {
            state.isIncomingCall = payload
        },
        TOGGLE_CALL_ANSWERED(state, payload = true) {
            state.isCallAnswered = payload
        },
        SOCKET_DISCONNECT(state) {
            state.socket.close(1000)
        },
        TOGGLE_IS_SOCKET_OPEN(state, payload = true) {
            state.isSocketOpen = payload
        },
        SET_VIDEO_TOKEN(state, payload) {
            state.identifiersCroup.videoToken = payload
        },
        SET_VIDEO_ID(state, payload) {
            state.identifiersCroup.videoToken = payload
        },
        SET_CALL_ID(state, payload) {
            state.identifiersCroup.callID = payload
        },
        SET_CLIENT_CHANNEL(state, payload) {
            state.clientChannel = payload
        },
        SET_USER_STREAM(state, payload) {
            state.userStream = payload
        },
        SET_PARTNER_STREAM(state, payload) {
            state.partnerStream = payload
        },
        SET_PEER_CONNECTION(state, payload) {
            state.peer = payload
        },
        SET_CALL_OVER(state, payload = true) {
            state.isCallOver = payload
        },
        SET_WHO_STOPPED_THE_CALL(state, payload = 'user') {
            state.whoStoppedTheCall = payload
        },

    },
    actions: {
        socketConnect({commit, dispatch}) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            console.log(token)
            const callCenterId = 'Q2FsbENlbnRlcjox'
            const type = 'operator'
            const url = `wss://vc-dev.enlighted.ru/ws/call-center-channel/${callCenterId}/?type=${type}&token=${token}`


            const socket = new WebSocket(url)
            commit('SET_SOCKET', socket)

            socket.addEventListener('open', () => {
                dispatch('socketOpen')
            })
            socket.addEventListener('error', () => {
                dispatch('socketError')
            })
            socket.addEventListener('close', () => {
                dispatch('socketClose')
            })
            socket.addEventListener('message', payload => {
                dispatch('socketMessage', payload)
            })
        },
        socketOpen() {
            customLog('socketOpen', 'Cокет соединение успешно открыто', 'lightgreen')
        },
        socketError({dispatch}) {
            customLog('socketError', 'Ошибка сокет соединения', 'red')
            dispatch('socketRetryConnect')

        },
        socketClose() {
            customLog('socketClose', 'Cокет соединение закрыто', 'red')
        },
        socketDisconnect({state, commit}) {
            if (state.socket) {
                commit('SOCKET_DISCONNECT')
                commit('TOGGLE_IS_SOCKET_OPEN', false)
            }
        },
        socketRetryConnect({state, dispatch}) {
            customLog('socketRetryConnect', 'Повторная попытка подключения к сокету')
            setTimeout(() => {
                dispatch('socketConnect')
            }, state.socketRetryConnectTime)
        },
        socketMessage({commit, dispatch}, payload) {
            console.log(payload)
            const info = getJsonFromString(payload.data).data
            const eventName = getJsonFromString(payload.data).event

            const isIncomingCallEvent = eventName === 'incoming_call' //идет запрос на звонок от терминала
            const isEndCallByEvent = eventName === 'end_call_by' //терминал завершил звонок
            const isCallAnsweredEvent = eventName === 'call_answered' //оператор поднял трубку
            const isMessageEvent = eventName === 'message' // пришло сообщение от терминала


            if (isIncomingCallEvent) {
                customLog('isIncomingCallEvent', `Входящий звонок, id звонка: ${info.call_id}`)

                commit('TOGGLE_INCOMING_CALL')
                console.log(info)
                commit('SET_VIDEO_TOKEN', info['video_token'])
                commit('SET_VIDEO_ID', info['video_id'])
                commit('SET_CALL_ID', info['call_id'])

            }

            if (isEndCallByEvent) {
                commit('SET_CALL_OVER')
                commit('SET_WHO_STOPPED_THE_CALL', 'partner')

                customLog('isEndCallByEvent', 'Терминал завершил звонок')
            }


            if (isCallAnsweredEvent) {
                commit('TOGGLE_CALL_ANSWERED')
                commit('TOGGLE_INCOMING_CALL', false)
                customLog('isIncomingCallEvent', `Оператор снял трубку: id звонка ${info.call_id}`)
            }

            if (isMessageEvent) {
                commit('SET_CLIENT_CHANNEL', info.from)

                const messageData = info.message_data
                const data = messageData.data

                const isIceCandidateEvent = messageData.event === 'ice-candidate' //пришел ice-candidate от терминала
                const isOfferEvent = messageData.event === 'offer' //получение офера с терминала

                if (isIceCandidateEvent) {
                    // dispatch('handleNewICECandidateMsg', data.candidate)
                }

                if (isOfferEvent) {
                    dispatch('createAnswer', data)
                }
            }
        },
        handleNewICECandidateMsg({state}, payload) {
            const candidate = new RTCIceCandidate(payload)
            try {
                state.peer.addIceCandidate(candidate)
            } catch (e) {
                customLog('handleNewICECandidateMsg', candidate, 'red')
                customLog('handleNewICECandidateMsg', e, 'red')
            }
        },
        async createPeer({state, commit, dispatch}) {

            const peer = await new RTCPeerConnection(state.options.constraints)

            commit('SET_PEER_CONNECTION', peer)

            state.peer.onicecandidate = e => {
                if (e.candidate) {

                    const data = {
                        to: state.clientChannel,
                        message_data: {
                            event: 'ice-candidate',
                            data: {
                                event: 'ice-candidate',
                                candidate: e.candidate,
                            }
                        }
                    }

                    dispatch('sendMessage', {eventName: 'message_to', data})
                }
            }

            state.peer.ontrack = e => {
                if (e) {
                    commit('SET_PARTNER_STREAM', e.streams[0])
                    customLog('ontrack', 'Монтирование видео партнера')
                } else {
                    customLog('ontrack', e, 'red')
                }
            }
            // eslint-disable-next-line require-await

            const stream = await navigator.mediaDevices.getUserMedia(state.options.mediaOptions)

            commit('SET_USER_STREAM', stream)

        },
        async createAnswer({state, dispatch}, payload) {
            await dispatch('createPeer')
            const desc = await new RTCSessionDescription(payload.sdp)
            state.userStream.getTracks().forEach(track => state.peer.addTrack(track, state.userStream))

            //передаем offer терминала в в webRTC с помощью setRemoteDescription
            await state.peer.setRemoteDescription(desc)

            const answer = await state.peer.createAnswer(state.options.offerOptions)
            await state.peer.setLocalDescription(answer)
            const data = {
                to: state.clientChannel,
                message_data: {
                    event: 'answer',
                    data: {
                        sdp: state.peer.localDescription
                    }
                }
            }
            dispatch('sendMessage', {eventName: 'message_to', data})
        },
        pickUpThePhone({state, dispatch}) {
            const data = {
                call_id: state.identifiersCroup.callID
            }
            dispatch('sendMessage', {eventName: 'picked_up', data})
        },

        stStopCall({state, commit, dispatch}) {
            const data = {
                call_id: state.identifiersCroup.callID
            }
            dispatch('sendMessage', {eventName: 'end_call', data})
            commit('SET_CALL_OVER')

            customLog('stStopCall', 'Оператор завершил звонок')
        },
        sendMessage({state}, {eventName, data}) {
            const payload = {
                event: eventName,
                data
            }
            state.socket.send(getStringFromJson(payload))
        },

    }
}
