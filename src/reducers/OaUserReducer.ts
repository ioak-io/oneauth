import { FETCH_ALL_USERS } from '../actions/types';

const initialState = {
  data: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      console.log('SET REALM reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
