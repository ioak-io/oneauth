import { UPDATE_PERMITTED_REALM } from '../actions/types';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PERMITTED_REALM:
      console.log('SET PERMITTED REALM reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
