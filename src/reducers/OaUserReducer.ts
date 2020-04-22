import { FETCH_ALL_USERS } from '../actions/types';

const initialState = {
  data: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      console.log('SET SPACE reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
