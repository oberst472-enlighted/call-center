import axiosUrl from './axiosUrl'
import token from './token'


//авторизация
export async function apiLogin(form) {
    const options = {
        method: 'post',
        url: `api/v1/auth/login/`,
        body: form,
        token: ''
    }
    const response = await axiosUrl(options)
    return response
}

// получить юзеров
export async function apiGetUsers() {
  const url = `api/v1/api/users/`
  const body = null
  return axiosUrl('get', url, body, token)
}

//получить юзера по id
export async function apiGetUserById(form) {
    const options = {
        method: 'get',
        url: `api/v1/api/users/${id}`,
        body: null,
        token: ''
    }
    const response = await axiosUrl(options)
    return response
}

//получить статистику
export async function apiGetStat(id) {
  const url = `api/v1/api/callcenters/${id}/stat/`
  const body = null
  return axiosUrl('get', url, body, token)
}

//
export async function ApiCallsOperator(id) {
  const url = `api/v1/api/users/${id}/calls/`
  const body = null
  return axiosUrl('get', url, body, token)
}

// получить звонки
export async function apiGetCalls() {
    const options = {
        method: 'get',
        url: `api/v1/calls`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

apiGetCalls()


