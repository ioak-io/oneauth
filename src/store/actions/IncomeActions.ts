/* eslint-disable import/prefer-default-export */
import {
  INCOME_ITEMS_FETCH_AND_APPEND,
  INCOME_ITEMS_FETCH_AND_SET,
  INCOME_ITEMS_UPDATE_FILTER,
  INCOME_ITEMS_UPDATE_PAGINATION,
  FETCH_CATEGORY,
  INCOME_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetIncomeItems =
  (space: string, authorization: any, payload: any) => (dispatch: any) => {
    _fetchIncomeItems(
      space,
      authorization,
      {
        ...payload,
        pagination: {
          pageNo: 0,
          pageSize: 20,
          hasMore: true,
          sortBy: null,
          sortOrder: null,
          ...payload.pagination,
        },
      },
      dispatch,
      INCOME_ITEMS_FETCH_AND_SET
    );
  };

export const fetchAndAppendIncomeItems =
  (space: string, authorization: any, payload: any) => (dispatch: any) => {
    if (payload.pagination.hasMore) {
      _fetchIncomeItems(
        space,
        authorization,
        payload,
        dispatch,
        INCOME_ITEMS_FETCH_AND_APPEND
      );
    }
  };

export const updateIncomeItems = (payload: any[]) => (dispatch: any) => {
  dispatch({
    type: INCOME_ITEMS_UPDATE,
    payload,
  });
};

const _fetchIncomeItems = (
  space: string,
  authorization: any,
  payload: any,
  dispatch: any,
  actionType: string
) => {
  console.log('****', space, authorization, payload);
  httpPost(`/income/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: actionType,
          payload: response.data.results,
        });
        dispatch({
          type: INCOME_ITEMS_UPDATE_PAGINATION,
          payload: {
            pageNo: response.data.pageNo,
            hasMore: response.data.hasMore,
            sortBy: payload?.pagination?.sortBy,
            sortOrder: payload?.pagination?.sortOrder,
          },
        });
        const { pagination = null, ...filter } = { ...payload };
        dispatch({
          type: INCOME_ITEMS_UPDATE_FILTER,
          payload: filter,
        });
      }
    })
    .catch((error) => {});
};
