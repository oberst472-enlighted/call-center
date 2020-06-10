export default {
  namespaced: true,
  state: {
    showCallPage: false,//------------ СТАТУС ОТКРЫТОГО ЗВОНКА
    isIncomingCall: false,//---------- СТАТУС ВХОДЯЩЕГО ЗВОНКА
    isCallInProgress: false, //------- СТАТУС ЗВОНКА В ПРОГРЕССЕ
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
    }
  },
  actions: {
    closeCallPageModal({commit}){
    }
  }
}
