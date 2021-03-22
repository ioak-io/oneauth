/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../Lib/RestTemplate';

export function fetchSpace() {
  return httpGet(
    `/space/introspect`,
    null,
    process.env.REACT_APP_ONEAUTH_API_URL
  ).then(function (response) {
    return Promise.resolve(response.data);
  });
}
