/* eslint-disable import/prefer-default-export */
import { httpPost, httpPut } from '../../Lib/RestTemplate';

export const getAggregate = (
  space: string,
  payload: any,
  authorization: any
) => {
  return httpPost(`/expense/${space}/aggregate`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
