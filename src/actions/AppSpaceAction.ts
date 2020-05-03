import { httpGet, httpPut, httpDelete } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { UPDATE_APP_SPACE } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'appspace';

export const fetchAppSpace = authorization => dispatch => {
  httpGet(`${constants.API_APP_SPACE_FETCH}/`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    dispatch({
      type: UPDATE_APP_SPACE,
      payload: { data: response.data.data },
    });
  });
};

export const updateAppSpace = (authorization, payload) => dispatch => {
  return httpPut(`${constants.API_APP_SPACE_FETCH}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchAppSpace(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteAppSpace = (authorization, spaceId, appId) => dispatch => {
  httpDelete(`${constants.API_APP_SPACE_FETCH}/${spaceId}/${appId}`, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchAppSpace(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
