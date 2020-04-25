import {
  httpGet,
  httpPut,
  httpDelete,
  httpPost,
} from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { UPDATE_APP } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'app';

export const fetchApp = authorization => dispatch => {
  httpGet(`${constants.API_APP_FETCH}/`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    dispatch({
      type: UPDATE_APP,
      payload: { data: response.data },
    });
  });
};

export const createApp = (authorization, payload) => dispatch => {
  return httpPost(`${constants.API_APP_FETCH}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'created' });
        dispatch(fetchApp(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const updateApp = (authorization, payload) => dispatch => {
  return httpPut(`${constants.API_APP_FETCH}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchApp(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteApp = (authorization, spaceId) => dispatch => {
  httpDelete(`${constants.API_APP_DELETE}/${spaceId}`, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        // sendMessage('notification', true, {type: 'success', message: 'FAQ deleted', duration: 5000});
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchApp(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
