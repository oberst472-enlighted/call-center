import axios from 'axios'
import store from '@/store'
export const axiosUrl = async function({method, url, body, token}) {
    if (method.toUpperCase() === 'GET') {
        try {
            return await axios({
                method,
                url,
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }
    if (method.toUpperCase() === 'POST') {
        try {
            return await axios({
                method,
                url,
                headers: {
                    Authorization: `JWT ${token}`
                },
                data: body
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }
    if (method.toUpperCase() === 'PATCH') {
        try {
            return await axios({
                method,
                url,
                headers: {
                    Authorization: `JWT ${token}`
                },
                data: body
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }
}

export const axiosFormData = async function({method, url, body, token}) {
        try {
            return await axios({
                method,
                url,
                headers: {
                    'Content-Type': 'multipart/form-data',
                        Authorization: `token ${token}`
                },
                onUploadProgress: uploadedEvent => {
                    store.commit('webrtc/webrtcCalls/SET_IS_PROGRESS_DOWNLOAD_VIDEO', Math.round(uploadedEvent.loaded / uploadedEvent.total * 100))
                },
                data: body
            })
        } catch (error) {
            console.error(error)
            return false
        }
}
