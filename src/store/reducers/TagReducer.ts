import { TAG_ITEMS_UPDATE, TAG_LIST_FETCH_AND_SET } from '../actions/types';
import { mergeItem } from './Utils';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case TAG_LIST_FETCH_AND_SET:
      console.log('TAG_LIST_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: [...action.payload],
      };
    case TAG_ITEMS_UPDATE:
      console.log('TAG_ITEMS_UPDATE reducer');
      console.log(action);
      return {
        ...state,
        items: mergeItem(state.items, action.payload),
      };
    default:
      return state;
  }
}
