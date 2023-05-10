/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { REFRESH_SPACES } from './types';

export const fetchAllSpaces = () => (dispatch: any) => {
  axios
    .get(`${process.env.REACT_APP_ONEAUTH_API_URL}/realm/introspect`)
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: REFRESH_SPACES,
        payload: { spaces: response.data },
      });
    });
};
