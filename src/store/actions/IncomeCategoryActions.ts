/* eslint-disable import/prefer-default-export */
import {
  INCOME_CATEGORY_ITEMS_FETCH_AND_SET,
  INCOME_CATEGORY_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPut } from '../../components/Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';
import constants from '../../components/Constants';

const domain = 'user';

export const fetchAllIncomeCategories =
  (space: string, authorization: any) => (dispatch: any) => {
    httpGet(`/incomecategory/${space}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    }).then((response) => {
      dispatch({
        type: INCOME_CATEGORY_ITEMS_FETCH_AND_SET,
        payload: { items: response.data },
      });
    });
  };

export const updateIncomeCategoryItem = (payload: any) => (dispatch: any) => {
  dispatch({
    type: INCOME_CATEGORY_ITEMS_UPDATE,
    payload,
  });
};
