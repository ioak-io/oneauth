/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { REFRESH_ASSETS } from './types';

export const fetchAllAssets = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/asset`).then((response) => {
    dispatch({
      type: REFRESH_ASSETS,
      payload: { assets: response.data },
    });
  });
};
