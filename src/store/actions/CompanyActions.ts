/* eslint-disable import/prefer-default-export */
import { COMPANY_LIST_FETCH_AND_SET } from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetCompanyItems =
  (authorization: any) => (dispatch: any) => {
    httpGet(`/company`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: COMPANY_LIST_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };
