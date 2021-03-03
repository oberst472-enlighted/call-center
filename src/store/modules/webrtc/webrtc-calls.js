/* eslint-disable */
import router from '@/router'

export default {
    namespaced: true,
    state: {
        progressDownloadVideo: 0,
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
        whoStoppedTheCall: 'user', //кто завершил звонок (user / device)


        deviceInfo: null,
        callQueue: [], //очередь звонков
        isSoundCallActive: false,
        isBreak: false

    },
    mutations: {
        TOGGLE_IS_OPERATOR_BUSY(state, payload = true) {
            state.isOperatorBusy = payload
        },
        SET_IS_PROGRESS_DOWNLOAD_VIDEO(state, payload = false) {
            state.progressDownloadVideo = payload
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
            // customLog('ADD_CALL_TO_THE_QUEUE', state.callQueue, 'red')
        },
        SET_DEVICE_INFO(state, payload) {
            state.deviceInfo = payload
        },
        DELETE_CALL_QUEUE_ITEM(state, id) {
            const index = state.callQueue.findIndex(item => item.call_id === id)
            state.callQueue.splice(index, 1)
            // customLog('DELETE_CALL_QUEUE_ITEM', state.callQueue)
        },
        TOGGLE_CALL_SOUND(state, payload = true) {
            state.isSoundCallActive = payload
        },
        TOGGLE_INCOMING_CALL(state, payload = true) {
            state.isIncomingCall = payload
        }

    },
    actions: {
        stCallRequestFromTerminal({state, commit}, info) {
            // console.log(info.ice)
            // commit('SET_ICE_SERVERS', info.ice)
            commit('ADD_CALL_TO_THE_QUEUE', info)
            commit('TOGGLE_CALL_SOUND')
            commit('TOGGLE_INCOMING_CALL')
            commit('SET_DEVICE_INFO', info)
        },

        stEndCall({state, commit, dispatch}, info) {
            const data = {call_id: state.callID}
            dispatch('webrtc/webrtcSockets/stSendMessage', {eventName: 'end_call', data}, {root: true})

            commit('TOGGLE_CALL_ANSWERED', false)
            commit('TOGGLE_CALL_OVER')
            commit('TOGGLE_CALL_SOUND', false)
            commit('TOGGLE_INCOMING_CALL', false)
            commit('DELETE_CALL_QUEUE_ITEM', info.id)
            commit('SET_WHO_STOPPED_THE_CALL', info.role)

            commit('SET_STOP_TIME', Date.now())
            const time = state.stopCallTime - state.startCallTime

            commit('SET_ALL_TIME', time)
            dispatch('webrtc/webrtcPeerConnection/stClosePeerConnection', null, {root: true})
        },
        stEndTheCallBeforeTheOperatorAnswered({state, commit, dispatch}, info) {
            commit('TOGGLE_CALL_ANSWERED', false)
            commit('TOGGLE_CALL_OVER')
            commit('TOGGLE_CALL_SOUND', false)
            commit('TOGGLE_INCOMING_CALL', false)
            commit('DELETE_CALL_QUEUE_ITEM', info.id)
        },

        stOperatorPickedUpThePhone({state, commit, dispatch, rootState}, info) {
            console.log(info.call_id)
            //сокет просигнализировал что оператор ответил на звонок
            commit('DELETE_CALL_QUEUE_ITEM', info.call_id)

            const isSuccess = info['operator_channel'] === rootState.webrtc.webrtcSockets.specificChannelName

            if (rootState.users.mainUserInfo.id === info['user_id'] && isSuccess) {
                commit('SET_START_TIME', Date.now())
                commit('TOGGLE_CALL_ANSWERED')
                commit('TOGGLE_IS_OPERATOR_BUSY')
                router.push({name: 'call-form-data', params: {id: info.call_id}})
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
            state.isOnce = true
            commit('SET_VIDEO_TOKEN', info['video_token'])
            commit('SET_VIDEO_ID', info['video_id'])
            commit('SET_CALL_ID', info['call_id'])


            const data = {
                call_id: info.call_id,
            }
            dispatch('webrtc/webrtcSockets/stSendMessage', {eventName: 'picked_up', data}, {root: true})
        }

    }
}
