/* eslint-disable */
import {customLog} from '@/utils/console-group'
import {getJsonFromString, getStringFromJson} from '@/utils/json'


export default {
    namespaced: true,
    state: {
        socket: null,
        isSocketOpen: false,
        socketRetryConnectTime: 5000,
        isSocketOnceConnection: false, //флаг для того чтобы не открывать сокет соединение пи переходах между роутами
        clientChannel: '',

    },
    mutations: {
        SET_IS_SOCKET_ONCE_CONNECTION(state, payload) {
            state.isNavigatorOnceConnection = payload
        },
        SET_SOCKET(state, payload) {
            state.socket = payload
        },
        SOCKET_DISCONNECT(state) {
            state.socket.close(1000)
        },
        TOGGLE_IS_SOCKET_OPEN(state, payload = true) {
            state.isSocketOpen = payload
        },
        SET_CLIENT_CHANNEL(state, payload) {
            state.clientChannel = payload
        },

    },
    actions: {
        stSocketConnect({commit, dispatch}) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            const callCenterId = 'Q2FsbENlbnRlcjox'
            const type = 'operator'
            const url = `wss://vc-dev.enlighted.ru/ws/call-center-channel/${callCenterId}/?type=${type}&token=${token}`

            const socket = new WebSocket(url)
            commit('SET_SOCKET', socket)

            socket.addEventListener('open', () => {
                dispatch('stSocketOpen')
            })
            socket.addEventListener('error', () => {
                dispatch('stSocketError')
            })
            socket.addEventListener('close', () => {
                dispatch('stSocketClose')
            })
            socket.addEventListener('message', payload => {
                dispatch('stSocketMessage', payload)
            })
        },
        stSocketOpen() {
            customLog('socketOpen', 'Cокет соединение успешно открыто', 'lightgreen')
        },
        stSocketError({dispatch}) {
            customLog('socketError', 'Ошибка сокет соединения', 'red')
            dispatch('stSocketRetryConnect')
        },
        stSocketClose() {
            customLog('stSocketClose', 'Cокет соединение закрыто', 'red')
        },
        stSocketDisconnect({state, commit}) {
            if (state.socket) {
                commit('SOCKET_DISCONNECT')
                commit('TOGGLE_IS_SOCKET_OPEN', false)
            }
        },
        stSocketRetryConnect({state, dispatch}) {
            customLog('stSocketRetryConnect', 'Повторная попытка подключения к сокету')
            setTimeout(() => {
                dispatch('stSocketConnect')
            }, state.socketRetryConnectTime)
        },
        stSocketMessage({state, commit, dispatch}, payload) {
            const info = getJsonFromString(payload.data).data
            const eventName = getJsonFromString(payload.data).event

            switch (eventName) {
                case 'incoming_call': //идет запрос на звонок от терминала
                    customLog('incoming_call', `Входящий звонок, id звонка: ${info.call_id}`)
                    dispatch('webrtc/webrtcCalls/stCallRequestFromTerminal', info, { root: true })
                    break

                case 'end_call_by': //терминал завершил звонок
                    customLog('end_call_by', 'Терминал завершил звонок')
                    dispatch('webrtc/webrtcCalls/stEndCall', 'partner', { root: true })
                    break

                case 'call_answered': //оператор поднял трубку
                    customLog('call_answered', `Оператор снял трубку: id звонка ${info.call_id}`)
                    dispatch('webrtc/webrtcCalls/stOperatorPickedUpThePhone', info, { root: true })
                    break

                case 'call_cancel': //обрыв соединения со стороны терминала
                    customLog('call_answered', `Внезапный обрыв соединения!! ${info.call_id}`)
                    dispatch('webrtc/webrtcCalls/stEndCall', 'partner', { root: true })
                    break

                case 'message': // пришло сообщение от терминала
                    commit('SET_CLIENT_CHANNEL', info.from)

                    const messageData = info.message_data
                    const data = messageData.data

                    if (messageData.event === 'ice-candidate') { //пришел ice-candidate от терминала
                        dispatch('webrtc/webrtcPeerConnection/stHandleNewICECandidateMsg', data.candidate, { root: true })
                    }
                    if (messageData.event === 'offer') {//получение офера с терминала
                        dispatch('webrtc/webrtcPeerConnection/stCreateAnswer', data, { root: true })
                    }
                    break
            }
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
