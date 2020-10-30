export default {
    namespaced: true,
    state: {
        alerts: []
    },
    mutations: {
        addItemIncrement(state, item) {
            state.alerts.push({ status: item[0], value: item[1], id: +new Date() })
        },
        addItemDecrement(state) {
            state.alerts.splice(0, 1)
        }
    },
    actions: {
        showAlert({ commit }, item) {
            commit('addItemIncrement', item)
        },
        deleteAlert({ commit }) {
            commit('addItemDecrement')
        }
    }
}

