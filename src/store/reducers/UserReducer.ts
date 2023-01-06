import { GET_USER, ADD_USER, FETCH_ALL_USERS } from '../actions/types';

const initialState = {
  users: [],
};

export default function UserReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_USER:
      console.log('GET_USER reducer');
      return {
        ...state,
      };
    case ADD_USER:
      console.log('ADD_USER reducer');
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_ALL_USERS:
      console.log('FETCH_ALL_USERS reducer');
      console.log(action);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
