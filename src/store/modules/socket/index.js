/* eslint-disable */
import {customLog} from '@/utils/console-group'
import {getJsonFromString, getStringFromJson} from '@/utils/json'
import dayjs from 'dayjs'
import {convertHMSToSeconds, convertSecondsToHMS} from '@/utils/convertDateTime'

export default {
    namespaced: true,
    state: {
        options: {
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
            }
        },
        identifiersCroup: {
            callID: '',
            videoToken: '',
            videoID: '',
        },
        clientChannel: '',

        startCallTime: '00:00:00', //12:32:14
        stopCallTime: '00:00:00', //12:34:43
        allCallTime: '00:00:00', //общее время разговора

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

        callQueue: [], //очередь звонков
        audio: new Audio('/assets/call-melody.mp3'),

    },
    mutations: {
        TOGGLE_CALL_SOUND(state, payload = true) {
            const startAudio = () => {
                const promise = state.audio.play()
                if (promise !== undefined) {
                    promise.then(() => {
                        customLog('startAudio', 'Браузер разрешил воспроизведение звука')
                    }).catch(error => {
                        customLog('startAudio', 'Браузер запретил воспроизведение звука', 'red')
                    })
                }
            }
            payload ? startAudio() : state.audio.pause()
        },
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
        SET_VIDEO_TOKEN(state, payload) {
            state.identifiersCroup.videoToken = payload
        },
        SET_VIDEO_ID(state, payload) {
            state.identifiersCroup.videoID = payload
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
        TOGGLE_CALL_OVER(state, payload = true) {
            state.isCallOver = payload
        },
        SET_WHO_STOPPED_THE_CALL(state, payload = 'user') {
            state.whoStoppedTheCall = payload
        },
        SET_START_TIME(state, payload) {
            state.startCallTime = payload
        },
        SET_STOP_TIME(state, payload) {
            state.stopCallTime = payload
        },
        SET_ALL_TIME(state, payload) {
            state.allCallTime = payload
        },
        ADD_CALL_QUEUE_ITEM(state, payload) {
            state.callQueue.push(payload)
            customLog('ADD_CALL_QUEUE_ITEM', 'Звонок добавлен в очередь', 'red')
        },
        DELETE_CALL_QUEUE_ITEM(state, id) {
            const index = state.callQueue.findIndex(item => item.call_id === id)
            state.callQueue.splice(index, 1)
            customLog('DELETE_CALL_QUEUE_ITEM', state.callQueue)
        }

    },
    actions: {
        socketConnect({commit, dispatch}) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
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
        socketMessage({state, commit, dispatch}, payload) {
            const info = getJsonFromString(payload.data).data
            const eventName = getJsonFromString(payload.data).event

            switch (eventName) {
                case 'incoming_call'://идет запрос на звонок от терминала

                    customLog('incoming_call', `Входящий звонок, id звонка: ${info.call_id}`)
                    commit('ADD_CALL_QUEUE_ITEM', info)
                    if (Boolean(state.callQueue.length)) {
                        commit('TOGGLE_CALL_SOUND')
                    }
                    commit('TOGGLE_INCOMING_CALL')
                    break

                case 'end_call_by'://терминал завершил звонок
                    dispatch('closeCall', 'partner')
                    customLog('end_call_by', 'Терминал завершил звонок')
                    break

                case 'call_answered'://оператор поднял трубку
                    customLog('call_answered', `Оператор снял трубку: id звонка ${info.call_id}`)
                    dispatch('operatorPickedUpThePhone', info)
                    break

                case 'call_cancel'://обрыв соединения со стороны терминала
                    dispatch('closeCall', 'partner')
                    customLog('call_answered', `Внезапный обрыв соединения!! ${info.call_id}`)
                    break

                case 'message':// пришло сообщение от терминала
                    commit('SET_CLIENT_CHANNEL', info.from)

                    const messageData = info.message_data
                    const data = messageData.data

                    if (messageData.event === 'ice-candidate') { //пришел ice-candidate от терминала
                        dispatch('handleNewICECandidateMsg', data.candidate)
                    }
                    if (messageData.event === 'offer') {//получение офера с терминала
                        dispatch('createAnswer', data)
                    }
                    break
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

        stClosePeerConnection({state, commit, dispatch}) {
            state.peer.close()
            state.userStream.getTracks().forEach(track => {
                track.stop()
            })
            state.peer = null
            commit('SET_PEER_CONNECTION', null)
            commit('SET_USER_STREAM', null)
            commit('SET_PARTNER_STREAM', null)
            setTimeout(() => {
                dispatch('getMedia')
            }, 500)
            if(state.callQueue.length) {
                commit('TOGGLE_CALL_SOUND')
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

                    dispatch('stSendMessage', {eventName: 'message_to', data})
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


        },
        async getMedia({state, commit}) {
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
            dispatch('stSendMessage', {eventName: 'message_to', data})
        },

        operatorPickedUpThePhone({commit}, info) {
            commit('DELETE_CALL_QUEUE_ITEM', info.call_id)
            if (Boolean(state.callQueue.length)) {
                commit('TOGGLE_CALL_SOUND')
                commit('TOGGLE_CALL_ANSWERED', false)
            }
            else {
                commit('TOGGLE_CALL_SOUND', false)
                commit('TOGGLE_CALL_ANSWERED')
            }
            // const userInfo = getJsonFromString(localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo'))
            // const userId = userInfo.id
            // if (userId === info.user_id) {
            //     commit('TOGGLE_CALL_ANSWERED')
            //     commit('TOGGLE_INCOMING_CALL', false)
            // }
            // else {
            //
            // }
            customLog('id', id, 'green')
        },
        pickUpThePhone({state, commit, dispatch}) {
            const info = state.callQueue[0]
            commit('SET_VIDEO_TOKEN', info['video_token'])
            commit('SET_VIDEO_ID', info['video_id'])
            commit('SET_CALL_ID', info['call_id'])
            commit('TOGGLE_CALL_SOUND', false)
            const data = {
                call_id: state.identifiersCroup.callID
            }
            dispatch('stSendMessage', {eventName: 'picked_up', data})
            commit('SET_START_TIME', dayjs().format('hh:mm:ss'))
        },

        stStopCall({state, dispatch}) {
            const data = {
                call_id: state.identifiersCroup.callID
            }
            dispatch('stSendMessage', {eventName: 'end_call', data})
            dispatch('closeCall', 'user')
            customLog('stStopCall', 'Оператор завершил звонок')
        },
        closeCall({state, commit, dispatch}, role) {
            commit('SET_STOP_TIME', dayjs().format('hh:mm:ss'))

            const time = convertSecondsToHMS(convertHMSToSeconds(state.stopCallTime) - convertHMSToSeconds(state.startCallTime))
            commit('SET_ALL_TIME', time)

            commit('TOGGLE_CALL_OVER')
            commit('DELETE_CALL_QUEUE_ITEM', state.identifiersCroup.callID)
            commit('SET_WHO_STOPPED_THE_CALL', role)
            dispatch('stClosePeerConnection')
         },
        stSendMessage({state}, {eventName, data}) {
            const payload = {
                event: eventName,
                data
            }
            state.socket.send(getStringFromJson(payload))
        },

    }
}
