import { httpDelete, httpGet, httpPost } from '../../Lib/RestTemplate';

export const getGridcontrolByClient = (clientId: string) => {
  return httpGet(`/gridcontrol/client/${clientId}`, null)
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

export const mapGridcontrolByClient = (
  clientId: string,
  realmList: number[]
) => {
  return httpPost(
    `/gridcontrol/client/${clientId}`,
    {
      realm: realmList,
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

export const deleteGridcontrolByClient = (clientId: string, realm: number) => {
  return httpDelete(
    `/gridcontrol/client/${clientId}`,
    {
      realm: [realm],
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

export const approveGridcontrolByClient = (clientId: string, realm: number) => {
  return httpPost(
    `/gridcontrol/client/${clientId}/approve`,
    {
      realm: [realm],
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
