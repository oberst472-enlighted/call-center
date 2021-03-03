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
        specificChannelName: '', // уникальный id для каждого соккет соединения, чтобы обрабатывать вызовы одному оператору в разный вкладках
        heartbeat: {
            intervalTime: 10000, //c какой частотой отправляем сообщение
            interval: null,
            actualStatus: 'unavailable',
            statuses: {
                operatorUnavailable: 'unavailable', // оператор онлайн но не начал смену и не на перерыве
                operatorOnline: 'online', // оператор онлайн
                operatorSays: 'on_call', // оператор разговаривает
                operatorBreak: 'on_break', // оператор на перерыве
            }
        }
    },
    mutations: {
        SET_IS_SOCKET_ONCE_CONNECTION(state, payload) {
            state.isNavigatorOnceConnection = payload
        },
        SET_SPECIFIC_CHANNEL_NAME(state, payload) {
            state.specificChannelName = payload
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
        TOGGLE_HEARTBEAT(state, payload) {
            payload ?
                state.heartbeat.interval = payload :
                clearInterval(state.heartbeat.interval)
        }
    },
    actions: {
        stSocketConnect({commit, dispatch}) {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token')
            const {call_center : callCenterId} = JSON.parse(localStorage.getItem('сс_main_user_info') || sessionStorage.getItem('сс_main_user_info'))
            const type = 'operator'

            const getUrl = () => {
                const hostName = window.location.hostname
                const devUrl = 'vc-dev.enlighted.ru'
                const prodUrl = 'dzv.stech.ru'

                if(process.env.NODE_ENV === 'production') {
                    return hostName === devUrl ? devUrl : prodUrl
                }
                else {
                    return devUrl
                }
            }

            const url = `wss://${getUrl()}/ws/call-center-channel/${callCenterId}/?type=${type}&token=${token}`

            const socket = new WebSocket(url)
            commit('SET_SOCKET', socket)

            socket.addEventListener('open', (data) => {
                dispatch('stSocketOpen')
            })
            socket.addEventListener('error', (data) => {
                dispatch('stSocketError')
            })
            socket.addEventListener('close', (data) => {
                dispatch('stSocketClose')
            })
            socket.addEventListener('message', payload => {
                dispatch('stSocketMessage', payload)
            })
        },
        stSocketOpen({state, dispatch}) {
            customLog('socketOpen', 'Cокет соединение успешно открыто', 'lightgreen')
           // dispatch('stStartHeartbeat', state.heartbeat.actualStatus)
        },
        stStartHeartbeat({state, commit, dispatch}, status) {
            dispatch('stSendMessage', {eventName: 'heartbeat', data: {status}})
            commit('TOGGLE_HEARTBEAT', false)
            const int = setInterval(() => {
                dispatch('stSendMessage', {eventName: 'heartbeat', data: {status}})
            }, state.heartbeat.intervalTime)
            commit('TOGGLE_HEARTBEAT', int)
        },
        stStopHeartbeat({commit}) {
            commit('TOGGLE_HEARTBEAT', false)
        },

        stSocketError({dispatch}) {
            customLog('socketError', 'Ошибка сокет соединения', 'red')
            dispatch('stSocketRetryConnect')

        },
        stSocketClose({dispatch}) {
            customLog('stSocketClose', 'Cокет соединение закрыто', 'red')
            dispatch('stStopHeartbeat')
        },
        stSocketDisconnect({state, commit, dispatch}) {
            if (state.socket) {
                commit('SOCKET_DISCONNECT')
                commit('TOGGLE_IS_SOCKET_OPEN', false)
                dispatch('stStopHeartbeat', false)
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
                case 'connect': //идет запрос на звонок от терминала
                    commit('SET_SPECIFIC_CHANNEL_NAME', info['channel_name'])
                    break
                case 'incoming_call': //идет запрос на звонок от терминала
                    //customLog('incoming_call', `Входящий звонок, id звонка: ${info.call_id}`)
                    commit('webrtc/webrtcPeerConnection/SET_ICE_SERVERS', info.ice, { root: true })
                    dispatch('webrtc/webrtcCalls/stCallRequestFromTerminal', info, { root: true })
                    break

                case 'end_call_by': //терминал завершил звонок
                    //customLog('end_call_by', 'Терминал завершил звонок')
                    dispatch('webrtc/webrtcCalls/stEndCall', {role: 'device'}, { root: true })
                    break

                case 'call_answered': //оператор поднял трубку
                    console.log(2)
                    //customLog('call_answered', `Оператор снял трубку: id звонка ${info.call_id}`)
                    dispatch('webrtc/webrtcCalls/stOperatorPickedUpThePhone', info, { root: true })
                    break

                case 'call_cancel': //обрыв соединения со стороны терминала
                    //customLog('call_answered', `Внезапный обрыв соединения!! ${info.call_id}`)
                    dispatch('webrtc/webrtcCalls/stEndCall', {role: 'device'}, { root: true })
                    break

                case 'call_was_canceled': //терминал завершил звонок до того как оператор ответил
                    //customLog('call_was_canceled', 'Терминал завершил звонок до ответа оператора')
                    dispatch('webrtc/webrtcCalls/stEndTheCallBeforeTheOperatorAnswered', {role: 'device', id: info.call_id}, { root: true })
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
