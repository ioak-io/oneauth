import { FETCH_ALL_ROLES } from './types';
import { httpGet, httpPut } from '../../components/Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';
import constants from '../../components/Constants';

const domain = 'user';

export const fetchAllRoles = (tenant: string, authorization: any) => (
  dispatch: any
) => {
  httpGet(`${constants.API_URL_ROLE}/${tenant}`, {
    headers: {
      Authorization: authorization.token,
    },
  }).then((response) => {
    dispatch({
      type: FETCH_ALL_ROLES,
      payload: { users: response.data.data },
    });
  });
};

export const saveRole = (tenant: string, authorization: any, payload: any) => (
  dispatch: any
) => {
  httpPut(`${constants.API_URL_ROLE}/${tenant}/`, payload, {
    headers: {
      Authorization: authorization.token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        sendMessage(domain, true, {
          action: payload.id ? 'updated' : 'created',
        });
        dispatch(fetchAllRoles(tenant, authorization));
      }
    })
    .catch((error) => {
      if (error.response.status === 401) {
        sendMessage('session expired');
      }
    });
};
