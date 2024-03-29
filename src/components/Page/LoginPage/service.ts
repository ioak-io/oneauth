/* eslint-disable import/prefer-default-export */
import { httpGet, httpPost, httpPut } from '../../Lib/RestTemplate';

const authBaseUrl = process.env.REACT_APP_API_URL

export const signin = (email: string, password: string) => {
    return httpPost(`/api-internal/auth/signin`, {
        response_type: "token",
        email, password
    }, {}, authBaseUrl)
        .then((response) => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            }
            return Promise.resolve({});
        })
        .catch((error) => {
            return Promise.resolve({});
        });
};
