/* eslint-disable import/prefer-default-export */
import {
  FETCH_CATEGORY,
  RECEIPT_ITEMS_UPDATE,
  CATEGORY_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPut } from '../../components/Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';
import constants from '../../components/Constants';

const domain = 'user';

export const fetchAllCategories =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/category/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    }).then((response) => {
      dispatch({
        type: FETCH_CATEGORY,
        payload: { categories: response.data },
      });
    });
  };

export const updateCategoryItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: CATEGORY_ITEMS_UPDATE,
    payload,
  });
};
