/* eslint-disable no-prototype-builtins */
import {
  EXPENSE_ITEMS_FETCH_AND_APPEND,
  EXPENSE_ITEMS_FETCH_AND_SET,
  EXPENSE_ITEMS_UPDATE,
  EXPENSE_ITEMS_UPDATE_FILTER,
  EXPENSE_ITEMS_UPDATE_PAGINATION,
} from '../actions/types';
import { mergeItems } from './Utils';

const initialState = {
  items: [],
  pagination: {
    pageSize: 20,
    pageNo: 0,
    hasMore: true,
    sortBy: null,
    sortOrder: null,
  },
  filter: {
    name: '',
    from: '',
    to: '',
    description: '',
    moreThan: null,
    lessThan: null,
    days: null,
    months: null,
    monthNumber: null,
    yearNumber: null,
    categoryIdList: [],
    kakeiboList: [],
    tagIdList: [],
  },
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case EXPENSE_ITEMS_FETCH_AND_SET:
      console.log('EXPENSE_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: [...action.payload],
      };
    case EXPENSE_ITEMS_FETCH_AND_APPEND:
      console.log('EXPENSE_ITEMS_FETCH_AND_APPEND reducer');
      console.log(action);
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };
    case EXPENSE_ITEMS_UPDATE:
      console.log('EXPENSE_ITEMS_UPDATE reducer');
      console.log(action);
      return {
        ...state,
        items: mergeItems(state.items, action.payload),
      };
    case EXPENSE_ITEMS_UPDATE_FILTER:
      console.log('EXPENSE_ITEMS_UPDATE_FILTER reducer');
      console.log(action);
      return {
        ...state,
        filter: { ...action.payload },
      };
    case EXPENSE_ITEMS_UPDATE_PAGINATION:
      console.log('EXPENSE_ITEMS_UPDATE_PAGINATION reducer');
      console.log(action);
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    default:
      return state;
  }
}
