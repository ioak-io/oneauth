import axios from 'axios';

export const axiosInstance = axios.create();
export const axiosManualInstance = axios.create();

const baseUrl = process.env.REACT_APP_API_URL;

export function httpGet(endpoint: string, headers: any, url?: string) {
  return axiosInstance.get((url || baseUrl) + endpoint, headers);
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
  return axiosInstance.post((url || baseUrl) + endpoint, payload, headers);
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
  return axiosInstance.put((url || baseUrl) + endpoint, payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpDelete(
  endpoint: string,
  headers: any,
  url?: string
) {
  return axiosInstance.delete((url || baseUrl) + endpoint, headers);
  // return axiosInstance.delete((url || baseUrl) + endpoint, {
  //   headers,
  //   data: payload,
  // });
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpGetManual(endpoint: string, headers: any, url?: string) {
  return axiosManualInstance.get((url || baseUrl) + endpoint, headers);
  // .then(function(response) {
  //     return Promise.resolve(response);
  // }
  // )
}

export function httpPostManual(
  endpoint: string,
  payload: any,
  headers: any,
  url?: string
) {
  return axiosManualInstance.post(
    (url || baseUrl) + endpoint,
    payload,
    headers
  );
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpPutManual(
  endpoint: string,
  payload: any,
  headers: any,
  url?: string
) {
  return axiosManualInstance.put((url || baseUrl) + endpoint, payload, headers);
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}

export function httpDeleteManual(
  endpoint: string,
  payload: any,
  headers: any,
  url?: string
) {
  return axiosManualInstance.delete((url || baseUrl) + endpoint);
  // return axiosInstance.delete((url || baseUrl) + endpoint, {
  //   headers,
  //   data: payload,
  // });
  //     .then(function(response) {
  //         return Promise.resolve(response);
  //     }
  // )
}
