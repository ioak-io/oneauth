import {
  httpGet,
  httpPut,
  httpDelete,
  httpPost,
} from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { UPDATE_CLIENT, REFRESH_CLIENTS } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'client';

export const fetchAllClients = () => (dispatch: any) => {
  httpGet(`${constants.API_CLIENT_FETCH}/`, null).then((response) => {
    dispatch({
      type: REFRESH_CLIENTS,
      payload: { clients: response.data },
    });
  });
};

export const fetchClient = () => (dispatch: any) => {
  httpGet(`${constants.API_CLIENT_FETCH}/`, null).then((response) => {
    dispatch({
      type: UPDATE_CLIENT,
      payload: { clients: response.data.data },
    });
  });
};

export const createClient = (payload: any) => (dispatch: any) => {
  return httpPost(`${constants.API_CLIENT_FETCH}/`, payload, null)
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'created' });
        dispatch(fetchAllClients());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const updateClient = (payload: any) => (dispatch: any) => {
  return httpPut(
    `${constants.API_CLIENT_FETCH}/${payload.client_id}`,
    payload,
    null
  )
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchAllClients());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteClient = (spaceId: number) => (dispatch: any) => {
  httpDelete(`${constants.API_CLIENT_DELETE}/${spaceId}`, null)
    .then((response) => {
      if (response.status === 200) {
        // sendMessage('notification', true, {type: 'success', message: 'FAQ deleted', duration: 5000});
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchClient());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
