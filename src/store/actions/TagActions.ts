/* eslint-disable import/prefer-default-export */
import { TAG_ITEMS_UPDATE, TAG_LIST_FETCH_AND_SET } from './types';
import { httpGet, httpPut } from '../../components/Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';
import constants from '../../components/Constants';

const domain = 'user';

export const fetchAllTags =
  (space: string, authorization: any) => (dispatch: any) => {
    console.log('****', space, authorization);
    httpGet(`/tag/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    }).then((response) => {
      dispatch({
        type: TAG_LIST_FETCH_AND_SET,
        payload: response.data,
      });
    });
  };

export const updateTagItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: TAG_ITEMS_UPDATE,
    payload,
  });
};
