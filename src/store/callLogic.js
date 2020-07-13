export default {
  namespaced: true,
  state: {
    showCallPage: false,//------------ СТАТУС ОТКРЫТОГО ЗВОНКА
    isIncomingCall: false,//---------- СТАТУС ВХОДЯЩЕГО ЗВОНКА
    isCallInProgress: false, //------- СТАТУС ЗВОНКА В ПРОГРЕССЕ,
    messageText: '',
    callTime: 0,
    callDate: null,
    startTime: null, //
    endTime: null,
    incomingData: null

  },
  getters: {},
  mutations: {
    openCallPage(state) {//----------- ОКТРЫТЬ ОКНО ЗВОНКА
      state.showCallPage = true
    },
    closeCallPage(state) {//---------- ЗАКРЫТЬ ОКНО ЗВОНКА
      state.showCallPage = false
    },
    comeIncomingCall(state){//-------- ПРИДОХ ВХОДЯЩЕГО ЗВОНКА
      state.isIncomingCall = true
    },
    cancelIncomingCall(state){//------ ПРЕКРАЩЕНИЕ ВХОДЯЩЕГО ЗВОНКА
      state.isIncomingCall = false
    },
    answerCall(state){//-------------- ОТВЕТИТЬ НА ЗВОНОК
      state.isCallInProgress = true
    },
    endCall(state){//----------------- ЗАКОНЧИТЬ АКТИВНЫЙ РАЗГОВОР
      state.isCallInProgress = false
    },
    setMessage(state, data){//----------------- ЗАКОНЧИТЬ АКТИВНЫЙ РАЗГОВОР
      state.messageText = data
    },
    incrementCallTime(state) {
      state.callTime += 1
    },
    cleanCallTime(state) {
      state.callTime = 0
    },
    setDate(state, date) {
      state.callDate = date
    },
    setStartTime(state, date) {
      state.startTime = date
    },
    setEndTime(state, date) {
      state.endTime = date
    },
    setIncomingData (state, data) {
      state.incomingData = data
    }
  },
  actions: {
    startSpeech({commit}) {
      commit('openCallPage')
      commit('answerCall')
      commit('cancelIncomingCall')
    },
    closeCallPageModal({commit}){
      commit('endCall');
    }
  }
}
