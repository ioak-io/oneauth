/* eslint-disable import/prefer-default-export */
import { USER_LIST_FETCH_AND_SET } from './types';
import { httpGet, httpPut } from '../../components/Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';
import constants from '../../components/Constants';

const domain = 'user';

export const fetchAndSetUserItems =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`${constants.API_URL_USER}/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    }).then((response) => {
      dispatch({
        type: USER_LIST_FETCH_AND_SET,
        payload: response.data,
      });
    });
  };
