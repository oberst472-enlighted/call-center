import {apiSendVideo} from '@/api'

export default {
    namespaced: true,
    state: {
        alerts: []
    },
    mutations: {
        addItemIncrement(state, item) {
            state.alerts.push({ status: item[0], value: item[1], id: +new Date() })
        },
        addItemDecrement(state) {
            state.alerts.splice(0, 1)
        }
    },
    actions: {
        async sendVideo(context, info) {
            console.log(77)
            console.log(info)
            await apiSendVideo(info)
        },
    }
}

