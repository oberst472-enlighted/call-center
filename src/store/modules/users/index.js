import { apiGetUsers, ApiCallsOperator, apiGetUserById, apiEditUserById, apiCreateUser} from '@/api';
import {getStringFromJson} from '@/utils/json'

export default {
    namespaced: true,
    state: {
        users: [],
        mainUserInfo: null, //информация о админе/операторе
        callsOperator: null,
        userInfo: null //детальная инфа о разных пользователях
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
        },
        SET_MAIN_USER_INFO(state, payload) {
            state.mainUserInfo = payload
            const data = localStorage.getItem('userData')
            const storage = data ? localStorage : sessionStorage
            storage.setItem('сс_main_user_info', getStringFromJson(payload))
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
                return response.data;
            } else {
                return false;
            }
        },
        async stCreateUser(context, info) {
            const response = await apiCreateUser(info);
            return Boolean(response) && response.status < 300 && (response.statusText === 'OK' || response.statusText === 'Created');
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
