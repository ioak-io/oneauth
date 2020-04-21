import { httpGet, httpPost } from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { FETCH_ALL_USERS } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'user';

export const fetchAllSpaceUser = authorization => dispatch => {
  httpGet(`${constants.API_URL}`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then(response => {
    dispatch({
      type: FETCH_ALL_USERS,
      payload: { data: response.data },
    });
  });
};

export const doNothing = (authorization, payload) => dispatch => {
  return httpPost(`${constants.API_SPACE_FETCH}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then(response => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchAllSpaceUser(authorization));
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
