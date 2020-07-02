import axios from 'axios'
import router from "../router";
import {API_URL} from '../config/types.js'
import Vue from 'vue'


const request = (callback) => {
  return new Promise((resolve, reject) => {
    callback
        .then(data => resolve(data))
        .catch(e => {
          console.error(e)

          if (e.message === 'Request failed with status code 401') {
            localStorage.clear()
            sessionStorage.clear()
            router.push('/login')
          }
          else{
            console.error(e)
          }
        });
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
