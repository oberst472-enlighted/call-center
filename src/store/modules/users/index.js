import { apiGetUsers, ApiCallsOperator, apiGetUserById } from "@/api";

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
        async stGetUserById(context, id) {
            const response = await apiGetUserById(id);
            if (Boolean(response) && response.status < 300 && response.statusText === "OK") {
                return {isSuccess: true, response};
            } else {
                return {isSuccess: false};
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
