/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../../Lib/RestTemplate';

export const saveNotelink = (space: string, sourceNoteRef: string, linkedNoteRef: string, authorization: any) => {
  return httpPost(`/notelink/${space}/${sourceNoteRef}/${linkedNoteRef}`, {}, {
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
