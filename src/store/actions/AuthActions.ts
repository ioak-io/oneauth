import { GET_AUTH, REMOVE_AUTH, ADD_AUTH } from './types';

export const getAuth = () => (dispatch: any) => {
  dispatch({
    type: GET_AUTH,
  });
};

export const addAuth = (data: any) => (dispatch: any) => {
  dispatch({
    type: ADD_AUTH,
    payload: data,
  });
};

export const removeAuth = () => (dispatch: any) => {
  dispatch({
    type: REMOVE_AUTH,
  });
};
