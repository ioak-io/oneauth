/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getUser = (realm: string, authorization: any) => {
    return httpGet(`/api-internal/${realm}/user`, {
        headers: {
            Authorization: authorization.access_token,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        })
        .catch((error) => {
            return Promise.resolve([]);
        });
};

export const createUser = (realm: string, name: string, authorization: any) => {
    return httpPost(`/api-internal/${realm}/user/${name}`, null, {
        headers: {
            Authorization: authorization.access_token,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        })
        .catch((error) => {
            return Promise.resolve({});
        });
};


export const deleteUser = (realm: string, id: string, authorization: any) => {
    return httpDelete(`/api-internal/${realm}/user/${id}`, {
        headers: {
            Authorization: authorization.access_token,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
        })
        .catch((error) => {
            return Promise.resolve({});
        });
};
