import axios from 'axios'

export default async function(method = 'GET', url, body, token = '') {
  if (method.toUpperCase() === 'GET') {
    try {
      return await axios({
        method,
        url,
        headers: {
          'x-access-token': token,
        },
      })
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
