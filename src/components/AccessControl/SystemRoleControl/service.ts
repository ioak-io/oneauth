import { httpDelete, httpGet, httpPost } from '../../Lib/RestTemplate';

export const getUsersWithSystemRoleForRealm = (realm: number) => {
  return httpGet(`/role/system/realm/${realm}/user`, null)
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

export const getUsersWithSystemRoleForClient = (clientId: string) => {
  return httpGet(`/role/system/client/${clientId}/user`, null)
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

export const getSystemRoles = () => {
  return httpGet(`/role/system`, null)
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

export const addSystemRoleForRealm = (
  realm: number,
  userId: string,
  roleId: string
) => {
  return httpPost(
    `/role/system/realm/${realm}/user/${userId}?role_id=${roleId}`,
    null,
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

export const addSystemRoleForClient = (
  clientId: string,
  userId: string,
  roleId: string
) => {
  return httpPost(
    `/role/system/client/${clientId}/user/${userId}?role_id=${roleId}`,
    null,
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

export const addSystemRoleForRealmForMultipleUsers = (
  realm: number,
  userIdList: string[],
  roleId: string
) => {
  return httpPost(
    `/role/system/realm/${realm}/user?role_id=${roleId}`,
    { user_id: userIdList },
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

export const addSystemRoleForClientForMultipleUsers = (
  clientId: string,
  userIdList: string[],
  roleId: string
) => {
  return httpPost(
    `/role/system/client/${clientId}/user?role_id=${roleId}`,
    { user_id: userIdList },
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

export const deleteSystemRoleForRealm = (
  realm: number,
  userId: string,
  roleId: string
) => {
  return httpDelete(
    `/role/system/realm/${realm}/user/${userId}?role_id=${roleId}`,
    null,
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

export const deleteSystemRoleForClient = (
  clientId: string,
  userId: string,
  roleId: string
) => {
  return httpDelete(
    `/role/system/client/${clientId}/user/${userId}?role_id=${roleId}`,
    null,
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
