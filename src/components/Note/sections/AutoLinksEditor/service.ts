/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../../Lib/RestTemplate';

export const deleteNotelink = (space: string, sourceReference: string, linkedReference: string, authorization: any) => {
  return httpDelete(`/notelink/${space}/${sourceReference}/${linkedReference}`, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
    .then((response: any) => {
      if (response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .catch((error: any) => {
      return Promise.resolve({});
    });
};
