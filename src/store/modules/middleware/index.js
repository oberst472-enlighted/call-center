
export default {
    namespaced: true,
    getters: {
        isAdmin: () => {
            const info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
            return Boolean(info) && JSON.parse(info).role === 'administrator'
        },
        isOperator: () => {
            const info = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo')
            return Boolean(info) && JSON.parse(info).role === 'operator'
        },
        isAuth: () => Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'))
    }
}
