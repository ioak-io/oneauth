import { UPDATE_ROLE } from '../actions/types';

const initialState = {
  data: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_ROLE:
      console.log('SET REALM reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
