/* eslint-disable no-case-declarations */
import { sortBy } from 'lodash';
import {
  LABEL_ITEMS_FETCH_AND_SET
} from '../actions/types';
import { mergeItems } from './Utils';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LABEL_ITEMS_FETCH_AND_SET:
      console.log('LABEL_ITEMS_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
