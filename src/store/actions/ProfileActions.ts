import { GET_PROFILE, SET_PROFILE } from './types';

export const getProfile = () => (dispatch: any) => {
  dispatch({
    type: GET_PROFILE,
  });
};

export const setProfile = (payload: any) => (dispatch: any) => {
  dispatch({
    type: SET_PROFILE,
    payload,
  });
};
