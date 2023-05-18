/* eslint-disable import/prefer-default-export */
import { REALM_LIST_FETCH_AND_SET } from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetRealmItems =
  (authorization: any) => (dispatch: any) => {
    httpGet(`/api-internal/realm`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: REALM_LIST_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };
