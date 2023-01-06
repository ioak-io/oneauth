import { REFRESH_ASSETS } from '../actions/types';

const initialState = {
  assets: [],
};

export default function AssetReducer(state = initialState, action: any) {
  switch (action.type) {
    case REFRESH_ASSETS:
      console.log('REFRESH_ASSETS reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
