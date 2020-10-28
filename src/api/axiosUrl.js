import axios from 'axios'

export default async function({method, url, body, token}) {
    if (method.toUpperCase() === 'GET') {
        try {
            return await axios({
                method,
                url,
                headers: {
                    'x-access-token': token
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
                    'x-access-token': token
                },
                data: body
            })
        } catch (error) {
            console.error(error)
            return false
        }
    }
}
