import { COMPANY_LIST_FETCH_AND_SET } from '../actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case COMPANY_LIST_FETCH_AND_SET:
      console.log('COMPANY_LIST_FETCH_AND_SET reducer');
      console.log(action);
      return {
        ...state,
        items: [...action.payload],
      };
    default:
      return state;
  }
}
