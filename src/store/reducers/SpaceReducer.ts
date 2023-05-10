import { REFRESH_SPACES } from '../actions/types';

const initialState = {
  assets: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case REFRESH_SPACES:
      console.log('GET_AUTH reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
