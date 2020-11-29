import { apiDownloadCsw } from '@/api';

export default {
    namespaced: true,
    state: {
        users: [],
        callsOperator: null,
        userInfo: null
    },
    mutations: {
        SET_USER_INFO(state, payload) {
            state.userInfo = payload
        }
    },
    actions: {
        async stDownloadCsw(context) {
            const response = await apiDownloadCsw();
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === 'OK'
            ) {
                return response
                // commit('setUsers', response.data);
            } else {
                return false;
            }
        },

    }
};
