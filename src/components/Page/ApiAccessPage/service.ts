/* eslint-disable import/prefer-default-export */
import { httpDelete, httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

export const getApiToken = (realm: string, authorization: any) => {
    return httpGet(`/api-internal/${realm}/apikey`, {
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

export const generateApiToken = (realm: string, authorization: any) => {
    return httpPost(`/api-internal/${realm}/apikey`, null, {
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


export const deleteApiToken = (realm: string, token: string, authorization: any) => {
    return httpDelete(`/api-internal/${realm}/apikey/${token}`, {
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
