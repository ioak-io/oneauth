import { REFRESH_SPACES } from '../actions/types';

const initialState = {
  spaces: [],
};

export default function SpaceReducer(state = initialState, action: any) {
  switch (action.type) {
    case REFRESH_SPACES:
      console.log('REFRESH_SPACES reducer');
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
