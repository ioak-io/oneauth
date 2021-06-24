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

export const fetchAllSpaces = () => (dispatch: any) => {
  httpGet(`${constants.API_SPACE_FETCH}/`, null).then((response) => {
    console.log(response);
    dispatch({
      type: REFRESH_SPACES,
      payload: { spaces: response.data },
    });
  });
};

export const fetchSpace = () => (dispatch: any) => {
  httpGet(`${constants.API_SPACE_FETCH}/`, null).then((response) => {
    dispatch({
      type: UPDATE_SPACE,
      payload: { data: response.data.data },
    });
  });
};

export const createSpace = (payload: any) => (dispatch: any) => {
  return httpPost(`${constants.API_SPACE_FETCH}/`, payload, null)
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'created' });
        dispatch(fetchSpace());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const updateSpace = (payload: any) => (dispatch: any) => {
  return httpPut(`${constants.API_SPACE_FETCH}/`, payload, null)
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchSpace());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteSpace = (spaceId: number) => (dispatch: any) => {
  httpDelete(`${constants.API_SPACE_DELETE}/${spaceId}`, null)
    .then((response) => {
      if (response.status === 200) {
        // sendMessage('notification', true, {type: 'success', message: 'FAQ deleted', duration: 5000});
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchSpace());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
