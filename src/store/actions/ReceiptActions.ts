/* eslint-disable import/prefer-default-export */
import {
  RECEIPT_ITEMS_FETCH_AND_APPEND,
  RECEIPT_ITEMS_FETCH_AND_SET,
  RECEIPT_ITEMS_UPDATE_FILTER,
  RECEIPT_ITEMS_UPDATE_PAGINATION,
  FETCH_CATEGORY,
  RECEIPT_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';

export const fetchAndSetReceiptItems =
  (space: string, authorization: any, payload: any) => (dispatch: any) => {
    _fetchReceiptItems(
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
      RECEIPT_ITEMS_FETCH_AND_SET
    );
  };

export const fetchAndAppendReceiptItems =
  (space: string, authorization: any, payload: any) => (dispatch: any) => {
    if (payload.pagination.hasMore) {
      _fetchReceiptItems(
        space,
        authorization,
        payload,
        dispatch,
        RECEIPT_ITEMS_FETCH_AND_APPEND
      );
    }
  };

export const updateReceiptItems = (payload: any[]) => (dispatch: any) => {
  dispatch({
    type: RECEIPT_ITEMS_UPDATE,
    payload,
  });
};

const _fetchReceiptItems = (
  space: string,
  authorization: any,
  payload: any,
  dispatch: any,
  actionType: string
) => {
  console.log('****', space, authorization, payload);
  httpPost(`/receipt/${space}/`, payload, {
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
          type: RECEIPT_ITEMS_UPDATE_PAGINATION,
          payload: {
            pageNo: response.data.pageNo,
            hasMore: response.data.hasMore,
            sortBy: payload?.pagination?.sortBy,
            sortOrder: payload?.pagination?.sortOrder,
          },
        });
        const { pagination = null, ...filter } = { ...payload };
        dispatch({
          type: RECEIPT_ITEMS_UPDATE_FILTER,
          payload: filter,
        });
      }
    })
    .catch((error) => {});
};
