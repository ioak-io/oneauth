import { UPDATE_PERMITTED_SPACE } from '../actions/types';

const initialState = {
  data: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PERMITTED_SPACE:
      console.log('SET PERMITTED SPACE reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
