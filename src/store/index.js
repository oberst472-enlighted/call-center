import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalTime: 0,
    workStatus: 'break'
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
    }
  },
  actions: {
  },
  modules: {
  }
})
