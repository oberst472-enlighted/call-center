// export default localStorage.getItem('token') || sessionStorage.getItem('token')
export const token = () => {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token')
    }
    else if (sessionStorage.getItem('token')) {
        return sessionStorage.getItem('token')
    }
}
