/* eslint-disable import/prefer-default-export */
import {
  EXPENSE_ITEMS_FETCH_AND_APPEND,
  EXPENSE_ITEMS_FETCH_AND_SET,
  EXPENSE_ITEMS_UPDATE_FILTER,
  EXPENSE_ITEMS_UPDATE_PAGINATION,
  EXPENSE_ITEMS_UPDATE,
} from './types';
import { httpGet, httpPost, httpPut } from '../../components/Lib/RestTemplate';
import { newId } from '../../events/MessageService';
import AddSpinnerCommand from '../../events/AddSpinnerCommand';
import RemoveSpinnerCommand from '../../events/RemoveSpinnerCommand';

export const fetchAndSetExpenseItems =
  (space: string, authorization: any, payload: any) => (dispatch: any) => {
    _fetchExpenseItems(
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
      EXPENSE_ITEMS_FETCH_AND_SET
    );
  };

export const fetchAndAppendExpenseItems =
  (space: string, authorization: any, payload: any) => (dispatch: any) => {
    if (payload.pagination.hasMore) {
      _fetchExpenseItems(
        space,
        authorization,
        payload,
        dispatch,
        EXPENSE_ITEMS_FETCH_AND_APPEND
      );
    }
  };

export const updateExpenseItems = (payload: any[]) => (dispatch: any) => {
  dispatch({
    type: EXPENSE_ITEMS_UPDATE,
    payload,
  });
};

const _fetchExpenseItems = (
  space: string,
  authorization: any,
  payload: any,
  dispatch: any,
  actionType: string
) => {
  console.log('****', space, authorization, payload);
  const taskId = newId();
  AddSpinnerCommand.next(taskId);
  httpPost(`/expense/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      RemoveSpinnerCommand.next(taskId);
      if (response.status === 200) {
        dispatch({
          type: actionType,
          payload: response.data.results,
        });
        dispatch({
          type: EXPENSE_ITEMS_UPDATE_PAGINATION,
          payload: {
            pageNo: response.data.pageNo,
            hasMore: response.data.hasMore,
            sortBy: payload?.pagination?.sortBy,
            sortOrder: payload?.pagination?.sortOrder,
          },
        });
        const { pagination = null, ...filter } = { ...payload };
        dispatch({
          type: EXPENSE_ITEMS_UPDATE_FILTER,
          payload: filter,
        });
      }
    })
    .catch((error) => {
      RemoveSpinnerCommand.next(taskId);
    });
};
