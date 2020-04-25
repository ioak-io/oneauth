import { UPDATE_APP } from '../actions/types';

const initialState = {
  data: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APP:
      console.log('SET APP reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
