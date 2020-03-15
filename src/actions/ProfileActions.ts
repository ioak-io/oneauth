import { GET_PROFILE, SET_PROFILE } from './types';

export const getProfile = () => dispatch => {
  dispatch({
    type: GET_PROFILE,
  });
};

export const setProfile = payload => dispatch => {
  dispatch({
    type: SET_PROFILE,
    payload,
  });
};
