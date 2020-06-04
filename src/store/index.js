import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalTime: 0,
    workStatus: 'break',
    isUserLoggedIn: false,
    userStatus: null,
    popupActive: null
  },
  mutations: {
    incrementTime(state) {
      state.totalTime += 1
    },
    toggleWorkingStatus(state, type) {
      if (type === state.workStatus) return
      if (state.workStatus === 'online') {
        state.workStatus = 'break'
      } else {
        state.workStatus = 'online'
      }
    },
    logIn(state, type){
      if (type === 'admin' || type === 'operator') {
        state.isUserLoggedIn = true
        state.userStatus = type
        console.log(type)
        return true
      } else {
        console.log(12323)
        return false
      }
    },
    closeSession(state) {
      state.workStatus = 'break'
    },
    setPopup(state, type){
      state.popupActive = type
    },
    cleanPopup(state){
      state.popupActive = null
    }
  },
  actions: {
    setPopup({state, commit}, type){
      if (state.popupActive === type) {
        commit('cleanPopup')
      } else {
        commit('setPopup', type)
      }
    }
  },
  modules: {
  }
})
