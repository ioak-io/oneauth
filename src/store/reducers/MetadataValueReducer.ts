/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import {
  METADATA_VALUE_ITEMS_FETCH_AND_SET
} from '../actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case METADATA_VALUE_ITEMS_FETCH_AND_SET:
      console.log('METADATA_VALUE_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
