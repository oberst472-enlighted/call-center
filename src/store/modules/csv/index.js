import { apiDownloadCsw, apiGetAllStatuses } from '@/api';

export default {
    namespaced: true,
    state: {
        users: [],
        callsOperator: null,
        userInfo: null,
        statuses: null
    },
    mutations: {
        SET_USER_INFO(state, payload) {
            state.userInfo = payload
        },
        SET_STATUSES(state, payload) {
            state.statuses = payload
        }
    },
    actions: {
        async stDownloadCsw(context, params) {
            const response = await apiDownloadCsw(params);
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
        async stGetAllStatuses({commit}) {
            const response = await apiGetAllStatuses();
            if (
                Boolean(response) &&
                response.status < 300 &&
                response.statusText === 'OK'
            ) {
                commit('SET_STATUSES', response.data)
                return response
                // commit('setUsers', response.data);
            } else {
                return false;
            }
        },
        apiGetAllStatuses

    }
};
