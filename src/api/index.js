import {axiosUrl, axiosFormData} from './axiosUrl'
import {token} from './token'
const pageSize = 100

//---------------- АВТОРИЗАЦИЯ
// 0.0.1 Авторизация apiLogin
// 0.0.2 Заявка на сброс пароля оператором apiResetPassword
// 0.0.3 Просмотр всех заявок на сброс пароля админом apiGetAllPasswordResetRequests
// 0.0.4 Установка нового пароля оператору ApiSetNewPasswordToOperator

//---------------- ЮЗЕРЫ
// 0.0.1 Получить всех юзеров apiGetUsers
// 0.0.2 Получить юзера id apiGetUserById
// 0.0.3 Создать нового юзера apiCreateUser
// 0.0.4 Отредатировать юзера apiEditUserById
// 0.0.5 Заблокировать юзера apiBlockUser

//---------------- ЗВОНКИ
// 0.0.1 Получить все звонки оператора за смену apiGetAllCallsForASession
// 0.0.2 Получить все звонки оператора apiGetAllCalls
// 0.0.3 Получить все звонки оператора из под админа по id apiGetAllCallsById
// 0.0.4 Отправить комментарий к звонку apiSendACommentToTheCall
// 0.0.5 Получить инфу о звонку по id apiGetDetailCallInfo

//---------------- СМЕНЫ
// 0.0.1 Старт смены apiStartSession
// 0.0.2 Стоп смены apiStopSession
// 0.0.3 Инфо о текущей смене apiGetCurrentSessionInfo
// 0.0.4 Начало перерыва начало перерыва apiStartSessionBreak
// 0.0.5 Конец перерыва apiStopSessionBreak

//---------------- ТЕРМИНАЛЫ
// 0.0.1 Получить все терминалы apiGetDevices
// 0.0.2 Детальная информация о терминале apiGetDevices

//---------------- СТАТИСТИКА
// 0.0.1 Получить статистику оператора за сессию apiGetStatForTheSession
// 0.0.2 Получить статистику для админа apiGetAdminStat

//---------------- CSV
// 0.0.1 Выгрузить CSV apiDownloadCsw

//---------------- СТАТУСЫ
// 0.0.1 Получить статусы apiGetAllStatuses

//---------------- ЯЗЫКИ
// 0.0.1 Получить список языков apiGetAllLangs

//---------------- ВИДЕО
// 0.0.1 Загрузка видео apiSendVideo


//--- Аторизация
// 0.0.1 Авторизация
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
// 0.0.2 Заявка на сброс пароля оператором
export async function apiResetPassword(form) {
    const userToken = token()
    const options = {
        method: 'post',
        url: `/api/v1/password-recovery-requests/`,
        body: form,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}
// 0.0.3 Просмотр всех заявок на сброс пароля админом
export async function apiGetAllPasswordResetRequests(form) {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/password-recovery-requests/`,
        body: form,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}
// 0.0.4 Установка нового пароля оператору
export async function ApiSetNewPasswordToOperator(info) {
    const userToken = token()
    const options = {
        method: 'post',
        url: `/api/v1/password-recovery-requests/${info.id}/set-password`,
        body: info.body,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}


//--- Юзеры
// 0.0.1 Получить всех юзеров
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

// 0.0.2 Получить юзера id
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
// 0.0.3 Создать нового юзера
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
// 0.0.4 Отредактировать юзера
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
// 0.0.5 Заблокировать юзера
export async function apiBlockUser(id) {
    const userToken = token()
    const options = {
        method: 'post',
        url: `/api/v1/users/${id}/block`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

// 0.0.5 Заблокировать юзера
export async function apiUnBlockUser(id) {
    const userToken = token()
    const options = {
        method: 'post',
        url: `/api/v1/users/${id}/unblock`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

//--- Звонки
// 0.0.1 Получить все звонки оператора за смену
export async function apiGetAllCallsForASession(params) {
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
// 0.0.2 Получить все звонки оператора
export async function apiGetAllCalls(params) {
    const userToken = token()
    const pageSize = 30
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
// 0.0.3 Получить все звонки оператора из под админа по id
export async function apiGetAllCallsById({params, id}) {
    const userToken = token()
    let query = ''
    if (params) {
        for (let key in params) {
            query += `&${key}=${params[key]}`
        }
    }
    query += `&operator=${id}&ordering=-created`

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
// 0.0.4 Отправить комментарий к звонку
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
// 0.0.5 Получить инфу о звонку по id
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

//--- Смены
// 0.0.1 Старт смены
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
// 0.0.2 Стоп смены
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
// 0.0.3 Инфо о текущей смене
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
// 0.0.4 Начало перерыва начало перерыва
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
// 0.0.5 Конец перерыва
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

//--- Терминалы
// 0.0.1 Получить все терминалы
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
// 0.0.2 Детальная информация о терминале
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
// 0.0.2 Получить статистику оператора за сессию
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
// 0.0.3 Получить статистику для админа
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

//--- CSV
// 0.0.1 Выгрузить CSV
export async function apiDownloadCsw(params) {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/report/${params}`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

//--- Статусы
// 0.0.1 Получить статусы apiGetAllStatuses
export async function apiGetAllStatuses() {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/call-statuses/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

//--- Языки
// 0.0.1 Получить статусы apiGetAllLangs
export async function apiGetAllLangs() {
    const userToken = token()
    const options = {
        method: 'get',
        url: `/api/v1/languages/`,
        body: null,
        token: userToken
    }
    const response = await axiosUrl(options)
    return response
}

//--- Видео
//0.0.1 Загрузка видео
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






