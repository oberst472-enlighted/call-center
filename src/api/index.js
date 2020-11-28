import axiosUrl from './axiosUrl'
import token from './token'

const pageSize = 100

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
// export async function apiGetStat(id) {
//   const url = `api/v1/api/callcenters/${id}/stat/`
//   const body = null
//   return axiosUrl('get', url, body, token)
// }

//
export async function ApiCallsOperator(id) {
  const url = `api/v1/api/users/${id}/calls/`
  const body = null
  return axiosUrl('get', url, body, token)
}

// получить звонки оператора за смену
export async function apiGetAllCallsPerWorkShift(params) {
    // const pageSize = 36
    let query = ''
    if (params) {
        for (let key in params) {
            query += `&${key}=${params[key]}`
        }
    }
    query+= `&page_size=${pageSize}&ordering=-created`
    const url = `api/v1/calls/?${query.substring(1)}`
    const options = {
        method: 'get',
        body: null,
        url,
        token
    }
    const response = await axiosUrl(options)
    return response
}

// отправить комментарий к звонку
export async function apiSendACommentToTheCall({callID, info}) {
    const options = {
        method: 'patch',
        url: ` api/v1/calls/${callID}/`,
        body: info,
        token
    }
    const response = await axiosUrl(options)
    return response
}




// старт смены
export async function apiStartSession() {
    const options = {
        method: 'patch',
        url: `api/v1/sessions/start-session/`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

// стоп смены
export async function apiStopSession() {
    const options = {
        method: 'patch',
        url: `api/v1/sessions/stop-session/`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

// инфо о текущей смене
export async function apiGetCurrentSessionInfo() {
    const options = {
        method: 'get',
        url: `api/v1/sessions/current-session/`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

// начало перерыва
export async function apiStartSessionBreak() {
    const options = {
        method: 'patch',
        url: `api/v1/sessions/start-break/`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

// конец перерыва
export async function apiStopSessionBreak() {
    const options = {
        method: 'patch',
        url: `api/v1/sessions/stop-break/`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

//получить терминалы
export async function apiGetDevices(params) {
    // const pageSize = 36
    let query = ''
    if (params) {
        for (let key in params) {
            query += `&${key}=${params[key]}`
        }
    }
    query+= `&page_size=${pageSize}&ordering=-created`
    const url = `api/v1/devices/?${query.substring(1)}`
    const options = {
        method: 'get',
        body: null,
        url,
        token
    }
    const response = await axiosUrl(options)
    return response
}

// получить статистику
export async function apiGetStat() {
    const options = {
        method: 'get',
        url: `api/v1/sessions/current-stat`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

export async function lol() {
    const options = {
        method: 'get',
        url: `api/v1/api/v1/calls/statQ2FsbDoyMDI0/`,
        body: null,
        token
    }
    const response = await axiosUrl(options)
    return response
}

// lol()






