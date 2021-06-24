import { httpGet, httpPut, httpDelete } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { UPDATE_PERMITTED_REALM } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'permittedspace';

export const fetchPermittedRealm = (authorization) => (dispatch) => {
  httpGet(`${constants.API_PERMITTED_REALM}/`, {
    headers: {
      Authorization: authorization.access_token,
    },
  }).then((response) => {
    dispatch({
      type: UPDATE_PERMITTED_REALM,
      payload: { data: response.data.data },
    });
  });
};

export const updatePermittedRealm = (authorization, payload) => (dispatch) => {
  return httpPut(`${constants.API_PERMITTED_REALM}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchPermittedRealm(authorization));
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deletePermittedRealm =
  (authorization, spaceId, clientId) => (dispatch) => {
    httpDelete(`${constants.API_PERMITTED_REALM}/${spaceId}/${clientId}`, {
      headers: {
        Authorization: authorization.access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          sendMessage(domain, true, { action: 'deleted' });
          dispatch(fetchPermittedRealm(authorization));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          sendMessage('session expired');
        }
      });
  };
