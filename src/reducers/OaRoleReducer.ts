import { UPDATE_ROLE } from '../actions/types';

const initialState = {
  data: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ROLE:
      console.log('SET SPACE reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
