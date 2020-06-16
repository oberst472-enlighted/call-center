import axios from 'axios'
import {API_URL} from '../config/types.js'
import Vue from 'vue'


const request = (callback) => {
  return new Promise((resolve, reject) => {
    callback
        .then(data => resolve(data))
        .catch(e => reject((e)));
  })
}


export default class apiRequest {
  static get(path) {
    return request(
        axios({
          method: 'get',
          url: path,
          headers: {
            'x-access-token': localStorage.getItem('token') || sessionStorage.getItem('token')
          }
        })
    )
  }

  static getPublic(path) {
    return request(axios.get(`${path}`));
  }

  static post(path, data) {
    return request(
        axios({
          method: 'post',
          url: path,
          data: data,
          headers: {
            'x-access-token': localStorage.getItem('token') || sessionStorage.getItem('token')
          }
        })
    )
  }

  static patch(path, data) {
    return request(
        axios({
          method: 'patch',
          url: path,
          data: data,
          headers: {
            'x-access-token': localStorage.getItem('token') || sessionStorage.getItem('token')
          }
        })
    );
  }

  static delete(path) {
    return request(axios.delete(`${path}`));
  }
}
