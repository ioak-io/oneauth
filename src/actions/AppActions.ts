import {
  httpGet,
  httpPut,
  httpDelete,
  httpPost,
} from '../components/Lib/RestTemplate';
import constants from '../components/Constants';
import { UPDATE_APP, REFRESH_APPS } from './types';
import { sendMessage } from '../events/MessageService';

const domain = 'app';

export const fetchAllApps = () => (dispatch: any) => {
  httpGet(`${constants.API_APP_FETCH}/`, null).then((response) => {
    dispatch({
      type: REFRESH_APPS,
      payload: { apps: response.data },
    });
  });
};

export const fetchApp = () => (dispatch: any) => {
  httpGet(`${constants.API_APP_FETCH}/`, null).then((response) => {
    dispatch({
      type: UPDATE_APP,
      payload: { apps: response.data.data },
    });
  });
};

export const createApp = (payload: any) => (dispatch: any) => {
  return httpPost(`${constants.API_APP_FETCH}/`, payload, null)
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'created' });
        dispatch(fetchApp());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const updateApp = (payload: any) => (dispatch: any) => {
  return httpPut(`${constants.API_APP_FETCH}/`, payload, null)
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, { action: 'updated' });
        dispatch(fetchApp());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};

export const deleteApp = (spaceId: number) => (dispatch: any) => {
  httpDelete(`${constants.API_APP_DELETE}/${spaceId}`, null)
    .then((response) => {
      if (response.status === 200) {
        // sendMessage('notification', true, {type: 'success', message: 'FAQ deleted', duration: 5000});
        sendMessage(domain, true, { action: 'deleted' });
        dispatch(fetchApp());
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
