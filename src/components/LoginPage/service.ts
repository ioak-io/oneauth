import { httpGet } from '../Lib/RestTemplate';

/* eslint-disable import/prefer-default-export */
export const getClient = (client: string) => {
  return httpGet(`/client/${client}`, null)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      return null;
    })
    .catch((error) => {
      return null;
    });
};
