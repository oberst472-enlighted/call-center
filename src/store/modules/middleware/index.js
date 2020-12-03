export default {
    namespaced: true,
    getters: {
        isAdmin: () => {
            const info = localStorage.getItem('сс_main_user_info') || sessionStorage.getItem('сс_main_user_info')
            return Boolean(info) && JSON.parse(info).role === 'administrator'
        },
        isOperator: () => {
            const info = localStorage.getItem('сс_main_user_info') || sessionStorage.getItem('сс_main_user_info')
            return Boolean(info) && JSON.parse(info).role === 'operator'
        },
        isAuth: () => Boolean(localStorage.getItem('token') || sessionStorage.getItem('token')),
        isRememberMe: () => Boolean(localStorage.getItem('cc_user_data')),
    }
}
