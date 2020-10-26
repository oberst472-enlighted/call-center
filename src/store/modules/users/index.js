import { apiGetUsers } from '@/api'

export default {
  namespaced: true,
  state: {
    users: [],
  },
  getters: {
    getUsersOperators(state) {
      return state.users.filter(
        (user) => user.userType.toLowerCase() === 'operator'
      )
    },
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload
    },
  },
  actions: {
    async stGetUsers({ commit }) {
      const response = await apiGetUsers()
      if (
        Boolean(response) &&
        response.status < 300 &&
        response.statusText === 'OK'
      ) {
        commit('setUsers', response.data)
        console.log(response)
        return true
      } else {
        return false
      }
    },
  },
}
