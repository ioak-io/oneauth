import { REFRESH_REALMS } from '../actions/types';

const initialState = {
  realms: [],
};

export default function RealmReducer(state = initialState, action: any) {
  switch (action.type) {
    case REFRESH_REALMS:
      console.log('REFRESH_REALMS reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
