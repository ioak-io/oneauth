import { REFRESH_APPS, UPDATE_APP } from '../actions/types';

const initialState = {
  apps: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case REFRESH_APPS:
      console.log('REFRESH_APPS reducer');
      return {
        ...state,
        ...action.payload,
      };
    // case UPDATE_APP:
    //   console.log('UPDATE_APP reducer');
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    default:
      return state;
  }
}
