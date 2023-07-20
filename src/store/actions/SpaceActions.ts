/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { REFRESH_SPACES } from './types';

export const fetchAllSpaces = () => (dispatch: any) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/api-internal/realm/introspect`)
    .then((response: any) => {
      console.log(response.data);
      dispatch({
        type: REFRESH_SPACES,
        payload: { spaces: response.data },
      });
    });
};
