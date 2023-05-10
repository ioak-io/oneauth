/* eslint-disable import/prefer-default-export */
import { httpPut } from '../Lib/RestTemplate';

export const saveIncome = (space: string, payload: any, authorization: any) => {
  return httpPut(`/income/${space}/`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
      return Promise.resolve({});
    })
    .catch((error) => {
      return Promise.resolve({});
    });
};
