import { httpGet, httpPut, httpDelete } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { UPDATE_PERMITTED_SPACE } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'permittedspace';

export const fetchPermittedSpace = authorization => dispatch => {
  httpGet(`${constants.API_PERMITTED_SPACE}/`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    dispatch({
      type: UPDATE_PERMITTED_SPACE,
      payload: { data: response.data.data },
    });
  });
};

export const updatePermittedSpace = (authorization, payload) => dispatch => {
  return httpPut(`${constants.API_PERMITTED_SPACE}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchPermittedSpace(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deletePermittedSpace = (
  authorization,
  spaceId,
  appId
) => dispatch => {
  httpDelete(`${constants.API_PERMITTED_SPACE}/${spaceId}/${appId}`, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchPermittedSpace(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
