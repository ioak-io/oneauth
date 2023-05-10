/* eslint-disable import/prefer-default-export */
import { FILTER_EXPENSE_LIST_FETCH_AND_SET } from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetFilterExpenseItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/filter/expense/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: FILTER_EXPENSE_LIST_FETCH_AND_SET,
            payload: response.data,
          });
        }
      })
      .catch((error) => {});
  };
