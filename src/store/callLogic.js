export default {
  namespaced: true,
  state: {
    showCallPage: false,
    isIncomingCall: true,
  },
  getters: {},
  mutations: {
    closeCallPage(state) {
      state.showCallPage = false
    },
    openCallPage(state) {
      state.showCallPage = true
    },
    comeIncomingCall(state){
      state.isIncomingCall = true
    },
    cancelIncomingCall(state){
      state.isIncomingCall = false
    }
  },
  actions: {}
}
