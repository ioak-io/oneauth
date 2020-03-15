import { GET_AUTH, REMOVE_AUTH, ADD_AUTH } from './types';

export const getAuth = () => dispatch => {
  dispatch({
    type: GET_AUTH,
  });
};

export const addAuth = data => dispatch => {
  dispatch({
    type: ADD_AUTH,
    payload: data,
  });
};

export const removeAuth = () => dispatch => {
  dispatch({
    type: REMOVE_AUTH,
  });
};
