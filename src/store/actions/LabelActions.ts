/* eslint-disable import/prefer-default-export */
import {
  LABEL_ITEMS_FETCH_AND_SET
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetLabelItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/label/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: LABEL_ITEMS_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };
