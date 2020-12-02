import {axiosUrl, axiosFormData} from './axiosUrl'
import {token} from './token'

const pageSize = 100

//авторизация
export async function apiLogin(form) {
    const options = {
        method: 'post',
        url: `/api/v1/auth/login/`,
        body: form,
        token: ''
    }
    const response = await axiosUrl(options)
    return response
}

// получить юзеров
export async function apiGetUsers() {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/users/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

//получить юзера по id
export async function apiGetUserById(id) {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/users/${id}`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

//создать нового юзера
export async function apiCreateUser(info) {
    const userToken = token()
    const options = {
        method: 'post',
        url: `/api/v1/users/`,
        body: info,
        token: userToken
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


// получить звонки оператора за смену
export async function apiGetAllCallsPerWorkShift(params) {
    const userToken = token()
    // const pageSize = 36
    const pageSize = 1000
    let query = ''
    if (params) {
        for (let key in params) {
            query += `&${key}=${params[key]}`
        }
    }
    query+= `&page_size=${pageSize}&ordering=-created`
    const url = `/api/v1/calls/?${query.substring(1)}`
    const options = {
        method: 'get',
        body: null,
        url,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// получить все звонки оператора
export async function apiGetAllCalls(params) {
    const userToken = token()
    const pageSize = 1000
    let query = ''
    if (params) {
        for (let key in params) {
            query += `&${key}=${params[key]}`
        }
    }
    query+= `&page_size=${pageSize}`
    const url = `/api/v1/calls/?${query.substring(1)}`
    const options = {
        method: 'get',
        body: null,
        url,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// получить все звонки оператора из под админа
export async function apiGetAllCallsById({params, id}) {
    const userToken = token()
    let query = ''
    if (params) {
        for (let key in params) {
            query += `&${key}=${params[key]}`
        }
    }
    query += `&operator=${id}`

    const url = `/api/v1/calls/?${query.substring(1)}`
    const options = {
        method: 'get',
        body: null,
        url,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}


// отправить комментарий к звонку
export async function apiSendACommentToTheCall({callID, info}) {
    const userToken = token()
    const options = {
        method: 'patch',
        url: ` /api/v1/calls/${callID}/`,
        body: info,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}




// старт смены
export async function apiStartSession() {
    const userToken = token()
    const options = {
        method: 'patch',
        url: `/api/v1/sessions/start-session/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// стоп смены
export async function apiStopSession() {
    const userToken = token()
    const options = {
        method: 'patch',
        url: `/api/v1/sessions/stop-session/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// инфо о текущей смене
export async function apiGetCurrentSessionInfo() {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/sessions/current-session/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// начало перерыва
export async function apiStartSessionBreak() {
    const userToken = token()
    const options = {
        method: 'patch',
        url: `/api/v1/sessions/start-break/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// конец перерыва
export async function apiStopSessionBreak() {
    const userToken = token()
    const options = {
        method: 'patch',
        url: `/api/v1/sessions/stop-break/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

//получить терминалы
export async function apiGetDevices(params) {
    const userToken = token()
    // const pageSize = 36
    let query = ''
    if (params) {
        for (let key in params) {
            query += `&${key}=${params[key]}`
        }
    }
    query+= `&page_size=${pageSize}&ordering=-created`
    const url = `/api/v1/devices/?${query.substring(1)}`
    const options = {
        method: 'get',
        body: null,
        url,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// получить статистику за сессию
export async function apiGetStatForTheSession() {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/sessions/current-stat`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}
// получить статистику
export async function apiGetAdminStat() {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/statistics/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}
// получить инфу о звонке по id
export async function apiGetDetailCallInfo(id) {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/calls/${id}/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}
// получить инфу о терминале по id
export async function apiGetDetailTerminalInfoById(id) {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/devices/${id}/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}
// отредактировать юзера
export async function apiEditUserById(info) {
    const userToken = token()
    const options = {
        method: 'patch',
        url: `/api/v1/users/${info.id}/`,
        body: info.body,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}


// csv
export async function apiDownloadCsw() {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/report/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}








//загрузка видео
export async function apiSendVideo(info) {
    const options = {
        method: 'patch',
        url: `/api/v1/videos/${info.id}/`,
        body: info.data,
        token: info.token
    }
    const response = await axiosFormData(options)
    return response
}



export const apiDownloadMedia = async function(formData) {
    const response = await fetch(`${baseUrl}/api/v1/media/`, {
        method: 'POST',
        headers: {
            Authorization: token()
        },
        body: formData
    })
    const data = await response.json()
    return !response.ok || response.status > 300 ? false : data
}






