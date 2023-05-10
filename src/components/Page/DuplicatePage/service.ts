/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getDuplicateReceipt = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(`/receipt/${space}/action/getduplicate`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
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

export const fixDuplicateReceipt = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(`/receipt/${space}/action/fixduplicate`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
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

export const getDuplicateLineItem = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(`/expense/${space}/action/getduplicate`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
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

export const fixDuplicateLineItem = (
  space: string,
  authorization: any,
  payload: any
) => {
  return httpPost(`/expense/${space}/action/fixduplicate`, payload, {
    headers: {
      Authorization: authorization.access_token,
    },
  })
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
