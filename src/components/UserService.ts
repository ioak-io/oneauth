/* eslint-disable import/prefer-default-export */
import { httpGet, httpPut } from '../components/Lib/RestTemplate';
import { sendMessage } from '../events/MessageService';
import constants from '../components/Constants';

const domain = 'user';

export const getSystemUsers = () => {
  return httpGet(`/user/system`, null)
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve([]);
    })
    .catch((error) => {
      return Promise.resolve([]);
    });
};
