/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { REFRESH_SPACES, UPDATE_SPACE } from './types';
import {
  httpGet,
  httpPut,
  httpDelete,
  httpPost,
} from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { sendMessage } from '../events/MessageService';

const domain = 'space';

export const fetchAllSpaces = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_ONEAUTH_API_URL}/space/introspect`)
    .then((response) => {
      console.log(response.data.data);
      dispatch({
        type: REFRESH_SPACES,
        payload: { spaces: response.data.data },
      });
    });
};

export const fetchSpace = (authorization) => (dispatch) => {
  httpGet(`${constants.API_SPACE_FETCH}/`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then((response) => {
    dispatch({
      type: UPDATE_SPACE,
      payload: { data: response.data.data },
    });
  });
};

export const createSpace = (authorization, payload) => (dispatch) => {
  return httpPost(`${constants.API_SPACE_FETCH}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'created' });
        dispatch(fetchSpace(authorization));
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const updateSpace = (authorization, payload) => (dispatch) => {
  return httpPut(`${constants.API_SPACE_FETCH}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchSpace(authorization));
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteSpace = (authorization, spaceId) => (dispatch) => {
  httpDelete(`${constants.API_SPACE_DELETE}/${spaceId}`, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        // sendMessage('notification', true, {type: 'success', message: 'FAQ deleted', duration: 5000});
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchSpace(authorization));
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
