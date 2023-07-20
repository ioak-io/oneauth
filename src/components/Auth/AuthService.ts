/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../Lib/RestTemplate';

export function fetchSpace() {
  return httpGet(
    `/api-internal/realm/introspect`,
    null,
    process.env.REACT_APP_API_URL
  ).then(function (response: any) {
    return Promise.resolve(response.data);
  });
}
