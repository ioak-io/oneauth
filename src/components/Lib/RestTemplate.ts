import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export function httpGet(endpoint: string, headers: any, url?: string) {
  return axios.get((url || baseUrl) + endpoint, headers);
  // .then(function(response) {
  //     return Promise.resolve(response);
  // }
  // )
}

export function httpPost(
  endpoint: string,
  payload: any,
  headers: any,
  url?: string
) {
  return axios.post((url || baseUrl) + endpoint, payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpPut(
  endpoint: string,
  payload: any,
  headers: any,
  url?: string
) {
  return axios.put((url || baseUrl) + endpoint, payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpDelete(endpoint: string, headers: any, url?: string) {
  return axios.delete((url || baseUrl) + endpoint, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}
