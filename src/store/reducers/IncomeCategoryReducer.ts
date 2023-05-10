import {
  INCOME_CATEGORY_ITEMS_FETCH_AND_SET,
  INCOME_CATEGORY_ITEMS_UPDATE,
} from '../actions/types';
import { mergeItem } from './Utils';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case INCOME_CATEGORY_ITEMS_FETCH_AND_SET:
      console.log('INCOME_CATEGORY_ITEMS_UPDATE reducer');
      console.log(action);
      return {
        ...state,
        ...action.payload,
      };
    case INCOME_CATEGORY_ITEMS_UPDATE:
      console.log('INCOME_CATEGORY_ITEMS_UPDATE reducer');
      console.log(action);
      return {
        ...state,
        items: mergeItem(state.items, action.payload),
      };
    default:
      return state;
  }
}
