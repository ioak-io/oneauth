import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export function httpGet(endpoint: string, headers: any) {
  return axios.get(baseUrl + endpoint, headers);
  // .then(function(response) {
  //     return Promise.resolve(response);
  // }
  // )
}

export function httpPost(endpoint: string, payload: any, headers: any) {
  return axios.post(baseUrl + endpoint, payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpPut(endpoint: string, payload: any, headers: any) {
  return axios.put(baseUrl + endpoint, payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpDelete(endpoint: string, headers: any) {
  return axios.delete(baseUrl + endpoint, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}
