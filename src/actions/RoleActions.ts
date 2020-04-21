import { httpGet, httpPut, httpDelete } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { UPDATE_ROLE } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'role';

export const fetchAdmins = authorization => dispatch => {
  httpGet(`${constants.API_ROLE_FETCH}`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    dispatch({
      type: UPDATE_ROLE,
      payload: { data: response.data },
    });
  });
};

export const updateRoles = (authorization, payload) => dispatch => {
  return httpPut(`${constants.API_ROLE_FETCH}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchAdmins(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteRoles = (
  authorization,
  type,
  userId,
  domainId
) => dispatch => {
  httpDelete(`${constants.API_ROLE_FETCH}/${type}/${userId}/${domainId}`, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchAdmins(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
