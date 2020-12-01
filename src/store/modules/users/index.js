import { apiGetUsers, ApiCallsOperator, apiGetUserById, apiEditUserById, apiCreateUser} from '@/api';

export default {
    namespaced: true,
    state: {
        users: [],
        callsOperator: null,
        userInfo: null
    },
    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        },
        setCallsOperator(state, payload) {
            state.callsOperator = payload;
        },
        SET_USER_INFO(state, payload) {
            state.userInfo = payload
            console.log(payload)
        }
    },
    actions: {
        async stGetUsers({ commit }) {
            const response = await apiGetUsers();
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === 'OK'
            ) {
                commit('setUsers', response.data);
                return true;
            } else {
                return false;
            }
        },
        async stGetUserById({commit}, id) {
            const response = await apiGetUserById(id);
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === 'OK'
            ) {
                commit('SET_USER_INFO', response.data);
                return true;
            } else {
                return false;
            }
        },
        async stEditUserById({commit}, info) {
            const response = await apiEditUserById(info);
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === 'OK'
            ) {
                commit('SET_USER_INFO', response.data);
                return true;
            } else {
                return false;
            }
        },
        async stCreateUser(context, info) {
            const response = await apiCreateUser(info);
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === 'OK'
            ) {
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
                response.statusText === 'OK'
            ) {
                commit('setCallsOperator', response.data);
                return true;
            } else {
                return false;
            }
        }
    }
};
