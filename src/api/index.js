import axiosUrl from './axiosUrl'
import token from './token'

// получить юзеров
export async function apiGetUsers() {
  const url = `/api/users/`
  const body = null
  return axiosUrl('get', url, body, token)
}

//получить статистику
export async function apiGetStat(id) {
  const url = `/api/callcenters/${id}/stat/`
  const body = null
  return axiosUrl('get', url, body, token)
}
