/* eslint-disable import/prefer-default-export */
import { setSessionValue } from '../../utils/SessionUtils';
import { httpPost, httpPut } from '../Lib/RestTemplate';

export const rotateToken = (authorization: any) => {
    return httpPost(
        `/api-internal/auth/token`,
        { grant_type: 'refresh_token', refresh_token: authorization.refresh_token },
        null,
        process.env.REACT_APP_API_URL
    )
        .then((response) => {
            if (response.status === 200) {
                setSessionValue(
                    `oneauth-access_token`,
                    response.data.access_token
                );
                return Promise.resolve(response.data);
            }
            return Promise.resolve(null);
        })
        .catch((error) => {
            return Promise.resolve(null);
        });
};
