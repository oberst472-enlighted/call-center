import Vue from 'vue'
import Vuex from 'vuex'
import callLogic from './callLogic'
import popup from './popup'
import apiRequest from "../utils/apiRequest";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalTime: 0,               //
    workStatus: null,
    userStatus: null,
    isActiveWorkShift: false,
    // Logic for popup

  },
  mutations: {
    incrementTime(state) {
      state.totalTime += 1
      localStorage.setItem('totalTime', +localStorage.getItem('totalTime') + +1)
    },
    cleanTime(state) {
      state.totalTime = 0
      localStorage.setItem('totalTime', 0)
    },
    setTime(state, time) {
      state.totalTime = time
    },
    toggleWorkingStatus(state, type) {
      localStorage.setItem('workStatus', type)
      state.workStatus = type
    },
    closeSession(state) {
      state.workStatus = 'break'
      localStorage.setItem('workStatus', 'break')
    },
    setUserStatus(state, type){
      state.userStatus = type
    },
    setWorkShiftStatus(state, status){
      state.isActiveWorkShift = status
      localStorage.setItem('isActiveWorkShift', status)
    },
  },
  actions: {
    startWorkShift({commit}){
      commit('setWorkShiftStatus', true)
      commit('toggleWorkingStatus', 'online')
    },
    endWorkShift({commit}){
      commit('setWorkShiftStatus', false)
      commit('toggleWorkingStatus', 'break')
      commit('cleanTime')
    },
    async logIn({commit}, data){

      localStorage.clear()
      sessionStorage.clear()
      let auth = await apiRequest.post('/api/auth/', {username: data.login, password: data.password})
      console.log(auth)
      let userInfo = await apiRequest.get(`/api/users/${auth.data.userId}/`)
      console.log(userInfo.data.user)

      if (auth.status === 200 && auth.data.auth) {
        if (data.rememberMe) {
          localStorage.setItem('isUserLoggedIn', true)
          localStorage.setItem('token', auth.data.token)
          localStorage.setItem('userType', userInfo.data.user.userType.toLowerCase())
          localStorage.setItem('userId', auth.data.userId)

          commit('setUserStatus', userInfo.data.user.userType.toLowerCase())
        } else {
          sessionStorage.setItem('isUserLoggedIn', true)
          sessionStorage.setItem('token', auth.data.token)
          sessionStorage.setItem('userType', userInfo.data.user.userType.toLowerCase())
          localStorage.setItem('userId', auth.data.userId)

          commit('setUserStatus', userInfo.data.user.userType.toLowerCase())
        }
        if (userInfo.data.user.userType.toLowerCase() === 'operator') {
          localStorage.setItem('userType', userInfo.data.user.userType.toLowerCase())
        }
        commit('toggleWorkingStatus', 'break')
        commit('setWorkShiftStatus', false)
      }


    },
    async logOut({state}){
      // clearing all storages
      localStorage.clear()
      sessionStorage.clear()
    }
  },
  modules: {
    callLogic,
    popup
  }
})
