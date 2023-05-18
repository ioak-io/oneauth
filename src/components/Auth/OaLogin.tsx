import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setSessionValue } from '../../utils/SessionUtils';
import { httpGet, httpPost } from '../Lib/RestTemplate';
import './Login.scss';

interface Props {
  cookies: any;
  history: any;
  location: any;
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';

const OaLogin = (props: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams) {
      httpGet('/user/token/local', {
        headers: {
          Authorization: searchParams.get("access_token"),
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('**', response.data.token);
            setSessionValue(`oneauth-access_token`, response.data.token);
            setSessionValue(`oneauth-refresh_token`, searchParams.get("refresh_token") || '');
            navigate(searchParams.get("from") || '/home');
          }
          return Promise.resolve({});
        })
        .catch((error) => {
          return Promise.resolve({});
        });
    }
  }, [searchParams]);

  return <></>;
};

export default OaLogin;
