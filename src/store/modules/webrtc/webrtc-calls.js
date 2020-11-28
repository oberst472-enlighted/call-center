/* eslint-disable */
import router from '@/router'
import {customLog} from '@/utils/console-group'
import {getJsonFromString, getStringFromJson} from '@/utils/json'

export default {
    namespaced: true,
    state: {

        callID: '',
        videoToken: '',
        videoID: '',

        startCallTime: '00:00:00', //12:32:14
        stopCallTime: '00:00:00', //12:34:43
        allCallTime: '00:00:00', //общее время разговора

        isVideoSectionActive: false, //активен экран с видео, новые звонки не принимаются

        isIncomingCall: false, //идет вызов от терминала
        isCallAnswered: false, //оператор снял трубку, начался разговор,
        isOperatorBusy: false,

        isCallOver: false, //звонок окончен
        whoStoppedTheCall: 'user', //кто завершил звонок (user / partner)




        callQueue: [], //очередь звонков
        isSoundCallActive: false,
        isBreak: false

    },
    mutations: {
        TOGGLE_IS_OPERATOR_BUSY(state, payload = true) {
            state.isOperatorBusy = payload
        },
        TOGGLE_CALL_ANSWERED(state, payload = true) {
            state.isCallAnswered = payload
        },
        SET_VIDEO_TOKEN(state, payload) {
            state.videoToken = payload
        },
        SET_VIDEO_ID(state, payload) {
            state.videoID = payload
        },
        SET_CALL_ID(state, payload) {
            state.callID = payload
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

        ADD_CALL_TO_THE_QUEUE(state, payload) {
            state.callQueue.push(payload)
            console.info(state.callQueue)
            // customLog('ADD_CALL_TO_THE_QUEUE', state.callQueue, 'red')
        },
        DELETE_CALL_QUEUE_ITEM(state, id) {
            const index = state.callQueue.findIndex(item => item.call_id === id)
            state.callQueue.splice(index, 1)
            console.info(state.callQueue)
            // customLog('DELETE_CALL_QUEUE_ITEM', state.callQueue)
        },
        TOGGLE_CALL_SOUND(state, payload = true) {
            state.isSoundCallActive = payload
        },
        TOGGLE_INCOMING_CALL(state, payload = true) {
            state.isIncomingCall = payload
        },
        TOGGLE_IS_VIDEO_SECTION_ACTIVE(state, payload = true) {
            state.isVideoSectionActive = payload
        }

    },
    actions: {
        stCallRequestFromTerminal({state, commit}, info) {
            commit('ADD_CALL_TO_THE_QUEUE', info)
            commit('TOGGLE_CALL_SOUND')
            commit('TOGGLE_INCOMING_CALL')
        },

        stEndCall({state, commit, dispatch}, role) {
            // customLog('stEndCall', `${role} завершил звонок`)

            if (role === 'user') {
                const data = {
                    call_id: state.callID
                }
                dispatch(
                    'webrtc/webrtcSockets/stSendMessage',
                    {eventName: 'end_call', data},
                    {root: true}
                )
            }

            commit('SET_STOP_TIME', Date.now())
            // commit('DELETE_CALL_QUEUE_ITEM', state.callID)

            const time = state.stopCallTime - state.startCallTime
            commit('SET_ALL_TIME', time)
            commit('TOGGLE_CALL_ANSWERED', false)
            commit('TOGGLE_CALL_OVER')
            commit('SET_WHO_STOPPED_THE_CALL', role)
            dispatch('webrtc/webrtcPeerConnection/stClosePeerConnection', null, {root: true})
        },


        stOperatorPickedUpThePhone({state, commit}, info) {
            //сокет просигнализировал что оператор ответил на звонок
            commit('DELETE_CALL_QUEUE_ITEM', info.call_id)

            const userInfo = getJsonFromString(localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo'))
            const userId = userInfo.id

            if (userId === info['user_id']) {
                commit('SET_START_TIME', Date.now())
                commit('TOGGLE_CALL_ANSWERED')
                commit('TOGGLE_IS_OPERATOR_BUSY')
                router.push({name: 'call-video', params: {id: info.call_id}})
            } else {
                if (!Boolean(state.callQueue.length)) {
                    commit('TOGGLE_CALL_SOUND', false)
                    commit('TOGGLE_INCOMING_CALL', false)
                }
            }
        },

        stClickTheCallBtn({state, commit, dispatch}) {
            //оператор нажал на зеленую кнопку, инициировал ответ на звонок
            const info = state.callQueue[0]

            commit('SET_VIDEO_TOKEN', info['video_token'])
            commit('SET_VIDEO_ID', info['video_id'])
            commit('SET_CALL_ID', info['call_id'])

            const data = {
                call_id: info.call_id
            }
            dispatch('webrtc/webrtcSockets/stSendMessage', {eventName: 'picked_up', data}, {root: true})
        }

    }
}
