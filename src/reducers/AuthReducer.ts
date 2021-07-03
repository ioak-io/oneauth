import { GET_AUTH, ADD_AUTH, REMOVE_AUTH } from '../actions/types';

const initialState = {
  isAuth: false,
  given_name: '',
  family_name: '',
};

export default function AuthReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_AUTH:
      console.log('GET_AUTH reducer');
      return {
        ...state,
      };
    case ADD_AUTH:
      console.log('ADD_AUTH reducer');
      return {
        ...state,
        ...action.payload,
      };

    case REMOVE_AUTH:
      console.log('REMOVE_AUTH reducer');
      console.log(state);
      return {
        ...state,
        isAuth: false,
        given_name: '',
        family_name: '',
      };
    default:
      return state;
  }
}
