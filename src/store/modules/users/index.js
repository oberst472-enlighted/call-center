import { apiGetUsers, ApiCallsOperator } from "@/api";

export default {
    namespaced: true,
    state: {
        users: [],
        callsOperator: null
    },
    getters: {
        getUsersOperators(state) {
            return state.users.filter(
                user => user.userType.toLowerCase() === "operator"
            );
        }
    },
    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        },
        setCallsOperator(state, payload) {
            state.callsOperator = payload;
        }
    },
    actions: {
        async stGetUsers({ commit }) {
            const response = await apiGetUsers();
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === "OK"
            ) {
                commit("setUsers", response.data);
                return true;
            } else {
                return false;
            }
        },
        async stCallsOperator({ commit }, id) {
            const response = await ApiCallsOperator(id);
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === "OK"
            ) {
                commit("setCallsOperator", response.data);
                return true;
            } else {
                return false;
            }
        }
    }
};
