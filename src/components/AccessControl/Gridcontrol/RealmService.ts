import { httpDelete, httpGet, httpPost } from '../../Lib/RestTemplate';

export const getGridcontrolByRealm = (realm: number) => {
  return httpGet(`/gridcontrol/realm/${realm}`, null)
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

export const mapGridcontrolByRealm = (
  realm: number,
  clientIdList: string[]
) => {
  return httpPost(
    `/gridcontrol/realm/${realm}`,
    {
      client_id: clientIdList,
    },
    null
  )
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

export const deleteGridcontrolByRealm = (realm: number, clientId: string) => {
  return httpDelete(
    `/gridcontrol/realm/${realm}`,
    {
      client_id: [clientId],
    },
    null
  )
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

export const approveGridcontrolByRealm = (realm: number, clientId: string) => {
  return httpPost(
    `/gridcontrol/realm/${realm}/approve`,
    {
      client_id: [clientId],
    },
    null
  )
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
