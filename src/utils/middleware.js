export const isRoleAdmin = () => {
    const info = localStorage.getItem('сс_main_user_info') || sessionStorage.getItem('сс_main_user_info')
    return Boolean(info) && JSON.parse(info).role === 'administrator'
}

export const isRoleOperator = () => {
    const info = localStorage.getItem('сс_main_user_info') || sessionStorage.getItem('сс_main_user_info')
    return Boolean(info) && JSON.parse(info).role === 'operator'
}

export const isUserAuth = () => Boolean(localStorage.getItem('token') || sessionStorage.getItem('token'))

export const isRememberMe = () => Boolean(localStorage.getItem('cc_user_data'))
