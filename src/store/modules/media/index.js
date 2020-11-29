import {apiDownloadMedia} from '@/api'

export default {
    namespaced: true,
    state: {},
    mutations: {
    },
    actions: {
        async stDownloadMedia(context, formData) {
            try {
                return await apiDownloadMedia(formData)
            } catch (e) {
                console.log(e)
                return false
            }
        }
    }
}
