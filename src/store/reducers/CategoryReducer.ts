import { FETCH_CATEGORY, CATEGORY_ITEMS_UPDATE } from '../actions/types';
import { mergeItem } from './Utils';

const initialState = {
  categories: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case FETCH_CATEGORY:
      console.log('FETCH_CATEGORY reducer');
      console.log(action);
      return {
        ...state,
        ...action.payload,
      };
    case CATEGORY_ITEMS_UPDATE:
      console.log('CATEGORY_ITEMS_UPDATE reducer');
      console.log(action);
      return {
        ...state,
        categories: mergeItem(state.categories, action.payload),
      };
    default:
      return state;
  }
}
