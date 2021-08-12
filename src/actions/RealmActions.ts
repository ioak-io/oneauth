/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { REFRESH_REALMS, UPDATE_REALM, UPDATE_CURRENT_REALM } from './types';
import {
  httpGet,
  httpPut,
  httpDelete,
  httpPost,
} from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { sendMessage } from '../events/MessageService';

const domain = 'realm';

export const fetchAllRealms = () => (dispatch: any) => {
  httpGet(`${constants.API_REALM_FETCH}/`, null).then((response) => {
    console.log(response);
    dispatch({
      type: REFRESH_REALMS,
      payload: { realms: response.data },
    });
  });
};

export const fetchRealm = () => (dispatch: any) => {
  httpGet(`${constants.API_REALM_FETCH}/`, null).then((response) => {
    dispatch({
      type: UPDATE_REALM,
      payload: { data: response.data.data },
    });
  });
};

export const createRealm = (payload: any) => (dispatch: any) => {
  return httpPost(`${constants.API_REALM_FETCH}/`, payload, null)
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'created' });
        dispatch(fetchAllRealms());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const updateRealm = (payload: any) => (dispatch: any) => {
  return httpPut(`${constants.API_REALM_FETCH}/${payload.realm}`, payload, null)
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchAllRealms());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteRealm = (spaceId: number) => (dispatch: any) => {
  httpDelete(`${constants.API_REALM_DELETE}/${spaceId}`, null)
    .then((response) => {
      if (response.status === 200) {
        // sendMessage('notification', true, {type: 'success', message: 'FAQ deleted', duration: 5000});
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchRealm());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
