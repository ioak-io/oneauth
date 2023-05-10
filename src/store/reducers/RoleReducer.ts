import { GET_ROLE, ADD_ROLE, FETCH_ALL_ROLES } from '../actions/types';

const initialState = {
  roles: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_ROLE:
      console.log('GET_ROLE reducer');
      return {
        ...state,
      };
    case ADD_ROLE:
      console.log('ADD_ROLE reducer');
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_ALL_ROLES:
      console.log('FETCH_ALL_ROLES reducer');
      console.log(action);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
