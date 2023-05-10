import {
  INCOME_ITEMS_FETCH_AND_APPEND,
  INCOME_ITEMS_FETCH_AND_SET,
  INCOME_ITEMS_UPDATE,
  INCOME_ITEMS_UPDATE_FILTER,
  INCOME_ITEMS_UPDATE_PAGINATION,
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
    case INCOME_ITEMS_FETCH_AND_SET:
      console.log('INCOME_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: [...action.payload],
      };
    case INCOME_ITEMS_FETCH_AND_APPEND:
      console.log('INCOME_ITEMS_FETCH_AND_APPEND reducer');
      console.log(action);
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };
    case INCOME_ITEMS_UPDATE:
      console.log('INCOME_ITEMS_UPDATE reducer');
      console.log(action);
      return {
        ...state,
        items: mergeItems(state.items, action.payload),
      };
    case INCOME_ITEMS_UPDATE_FILTER:
      console.log('INCOME_ITEMS_UPDATE_FILTER reducer');
      console.log(action);
      return {
        ...state,
        filter: { ...action.payload },
      };
    case INCOME_ITEMS_UPDATE_PAGINATION:
      console.log('INCOME_ITEMS_UPDATE_PAGINATION reducer');
      console.log(action);
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    default:
      return state;
  }
}
