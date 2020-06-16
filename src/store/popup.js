export default {
  namespaced: true,
  state: {
    popupActive: null,
  },
  getters: {},
  mutations: {
    setPopup(state, type){
      state.popupActive = type
    },
    cleanPopup(state){
      state.popupActive = null
    },
  },
  actions: {
    setPopup({state, commit}, type){
      if (state.popupActive === type) {
        commit('cleanPopup')
      } else {
        commit('setPopup', type)
      }
    },
  }
}
