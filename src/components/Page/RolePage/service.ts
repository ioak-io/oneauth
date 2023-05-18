/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getRole = (realm: string, authorization: any) => {
    return httpGet(`/api-internal/${realm}/role`, {
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

export const createRole = (realm: string, name: string, authorization: any) => {
    return httpPost(`/api-internal/${realm}/role/${name}`, null, {
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


export const deleteRole = (realm: string, id: string, authorization: any) => {
    return httpDelete(`/api-internal/${realm}/role/${id}`, {
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
