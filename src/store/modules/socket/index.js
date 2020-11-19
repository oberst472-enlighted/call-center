export default {
    namespaced: true,
    state: {
        socket: null
    },
    getters: {
    },
    mutations: {
        getSocket(state, payload) {
            state.socket = payload
            console.log(payload)
        }
    },
    actions: {
        socketConnect({state, commit, dispatch}) {
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im9wZXJhdG9yIiwiZXhwIjoxNjA1ODA1NDI2LCJlbWFpbCI6bnVsbCwib3JpZ19pYXQiOjE2MDU3MTkwMjZ9.FDqzr8RyIniVk2UAsJXyGfu-OaukZNDhj5zVYEwdmcM'
            const callCenterId = 'Q2FsbENlbnRlcjox'
            const type = 'operator'
            const url = `wss://vc-dev.enlighted.ru/ws/call-center-channel/${callCenterId}/?type=${type}&token=${token}`

            const socket = new WebSocket(url)
            commit('getSocket', socket)

            state.socket.addEventListener('open', dispatch('socketOpen'))
            state.socket.addEventListener('error', dispatch('socketError'))
            state.socket.addEventListener('message', dispatch('socketMessage'))
            state.socket.addEventListener('close', dispatch('socketClose'))
        },
        socketDisconnect() {
            console.log('disk')
            // if (this.socket) {
            //     this.socket.close(1000)
            //     this.isSocketOpen = false
            // }
        },
        socketOpen() {
            console.log('сокет открыт')
            // this.log('socketOpen', 'Cокет соединение открыто')
            // this.isSocketOpen = true
        },
        socketError() {
            console.error('ошибка сокет соединения')
            // this.socketRetryConnect()
        },
        socketMessage() {
            console.log('message')
            // this.messageProcessing(data)
        },
        socketClose() {
            console.log('lol')
        },
    }
}
