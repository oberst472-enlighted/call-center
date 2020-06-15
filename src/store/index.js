import Vue from 'vue'
import Vuex from 'vuex'
import callLogic from './callLogic'
import apiRequest from "../utils/apiRequest";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalTime: 0,
    workStatus: 'break',
    isUserLoggedIn: false,
    userStatus: null,
    popupActive: null,
    isActiveWorkShift: false
  },
  mutations: {
    incrementTime(state) {
      state.totalTime += 1
    },
    cleanTime(state) {
      state.totalTime =0
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
      state.isUserLoggedIn = true
      state.userStatus = type
    },
    cleanUser(state) {
      state.isUserLoggedIn = false
      state.userStatus = null
    },
    closeSession(state) {
      state.workStatus = 'break'
    },
    setPopup(state, type){
      state.popupActive = type
    },
    cleanPopup(state){
      state.popupActive = null
    },
    setWorkShiftStatus(state, status){
      state.isActiveWorkShift = status
    }
  },
  actions: {
    setPopup({state, commit}, type){
      if (state.popupActive === type) {
        commit('cleanPopup')
      } else {
        commit('setPopup', type)
      }
    },
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

      // console.log(document.cookie)
      //
      // console.log(document.cookie)
      // Vue.$cookies.set('theme','default')
      // Vue.$cookies.set('theme','default')
      // console.log(Vue.$cookies.get('theme'))
      // Vue.$cookies.remove('theme')
      // console.log(Vue.$cookies.get('theme'))

      console.log('start')
      let userToken = await apiRequest.post(
          'api/auth',
          `{"username":"${data.login}", "password":"${data.password}"}`
      )
      console.log(userToken)
      console.log('finish')

      // let type = 'operator'
      // let token = 'dsadsadsa'
      //
      // if (type === 'admin' || type === 'operator') {
      //   commit('logIn', type)
      // }
      //
      // document.cookie = `token=${token}`
      // console.log(document.cookie)

      // if (data.rememberMe) {
      //   console.log('local')
      //   localStorage.setItem('isUserLoggedIn', true)
      //   localStorage.setItem('userType', type)
      // } else {
      //   console.log('session')
      //   sessionStorage.setItem('isUserLoggedIn', true)
      //   sessionStorage.setItem('userType', type)
      // }
      // console.log(localStorage.getItem('isUserLoggedIn'))
      // console.log(sessionStorage.getItem('isUserLoggedIn'))

    },
    logOut({commit}){
      console.log('logout')
      commit('cleanUser')

      // clearing all storages
      localStorage.clear()
      sessionStorage.clear()
      let cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      console.log(document.cookie)
    }
  },
  modules: {
    callLogic
  }
})
