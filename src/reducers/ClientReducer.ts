import { REFRESH_CLIENTS, UPDATE_CLIENT } from '../actions/types';

const initialState = {
  clients: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case REFRESH_CLIENTS:
      console.log('REFRESH_CLIENTS reducer');
      return {
        ...state,
        ...action.payload,
      };
    // case UPDATE_CLIENT:
    //   console.log('UPDATE_CLIENT reducer');
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    default:
      return state;
  }
}
