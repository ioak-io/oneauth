import { connect, useSelector, useDispatch } from 'react-redux';
import { addAuth } from '../../store/actions/AuthActions';
import { httpGet, httpPost, httpPut } from '../Lib/RestTemplate';

export function fetchRealm() {
  return httpGet(
    `/space/introspect`,
    null,
    process.env.REACT_APP_ONEAUTH_API_URL
  ).then(function (response) {
    return Promise.resolve(response.data);
  });
}

export const refreshAccessToken = (
  space: string,
  authorization: any,
  dispatch: any
) => {
  console.log('-------------');
  httpPost(
    '/auth/token',
    {
      grant_type: 'refresh_token',
      space,
      refresh_token: authorization.refresh_token,
    },
    null
  )
    .then((refreshTokenResponse) => {
      if (refreshTokenResponse.status === 200) {
        // cookies.set(
        //   `${space}-access_token`,
        //   refreshTokenResponse.data.access_token
        // );
        dispatch(
          addAuth({
            ...authorization,
            access_token: refreshTokenResponse.data.access_token,
          })
        );
      } else {
        // removeSessionValue(`${space}-access_token`);
        // removeSessionValue(`${space}-refresh_token`);
      }
    })
    .catch((error) => {
      // removeSessionValue(`${space}-access_token`);
      // removeSessionValue(`${space}-refresh_token`);
    });
};
