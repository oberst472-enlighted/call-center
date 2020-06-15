import axios from 'axios'
import {API_URL} from '../config/types.js'

const request = (callback) => {
  return new Promise((resolve, reject) => {
    callback
        .then(data => resolve(data))
        .catch(e => reject((e)));
  })
}


export default class apiRequest {
  static get(path) {
    return request(axios.get(`${path}`));
  }

  static getPublic(path) {
    return request(request(axios.get(`${path}`)));
  }

  static post(path, data) {
    return axios.post(`${path}`, data);
  }

  static patch(path, data) {
    return request(axios.patch(`${path}`, data));
  }

  static delete(path) {
    return request(axios.delete(`${path}`));
  }
}
