import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import './LoginFormContainer.scss';
import { sendMessage, receiveMessage } from '../../../events/MessageService';
import NewUser from '../form/NewUser';
import SigninPage from '../form/SigninPage';
import VerifySession from '../form/VerifySession';
import { httpGet, httpPost } from '../../Lib/RestTemplate';
import ResetPassword from '../form/ResetPassword';
import ConfirmEmail from '../form/ConfirmEmail';
import NotificationMessage from '../form/NotificationMessage';
import { loginPageSubject } from '../../../events/LoginPageEvent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const queryString = require('query-string');

interface Props {
  realm: string;
  clientId: string;
  background?: 'image' | 'light' | 'dark';
  currentRealm: any;
  currentClient: any;
}

const LoginFormContainer = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const location = useLocation();
  const history = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const [type, setType] = useState('signin');
  const [authCode, setAuthCode] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    type: '',
    message: '',
  });

  const [client, setClient] = useState('');
  const [queryParam, setQueryParam] = useState<any>();
  const [verificationStep, setVerificationStep] = useState(false);

  useEffect(() => {
    if (props.currentRealm) {
      const el = document.getElementById('image-container');
      if (el) {
        el.style.background = `url('${props.currentRealm.site?.background}') no-repeat center center`;
        el.style.backgroundSize = 'cover';
      }
    }
  }, [props.currentRealm]);

  useEffect(() => {
    sendMessage('navbar', false);

    const eventBus = receiveMessage().subscribe((message) => {
      if (message.name === 'login-spinner') {
        setSpinner(message.signal);
        if (message.signal) {
          setNotificationMessage({
            type: '',
            message: '',
          });
        }
      } else if (message.name === 'login-notification') {
        setNotificationMessage(message.data);
        setSpinner(false);
      }
    });
    return () => eventBus.unsubscribe();
  }, []);

  const changeRoute = (routeType: string) => {
    setNotificationMessage({ type: '', message: '' });
    history(`/realm/${props.realm}/login/${props.clientId}?type=${routeType}`);
  };

  useEffect(() => {
    setVerificationStep(true);
    // let clientRef = null;
    // if (location.search) {
    const query = new URLSearchParams(location.search);
    setQueryParam({ ...query });
    if (query && query.has('type')) {
      setType(query.get('type') || '');
    } else {
      setType('signin');
    }
    if (query && query.has('auth')) {
      setAuthCode(query.get('auth') || '');
    } else {
      setAuthCode('');
    }
    // if (query && query.client) {
    //   setClient(query.client);
    //   clientRef = query.client;
    // } else {
    //   setClient('');
    // }
    // }
    const refreshToken = cookies[`${props.realm}-refresh_token`];
    const accessToken = getAccessToken(
      cookies[`${props.realm}-access_token`],
      refreshToken
    );
    if (
      (props.realm === authorization.realm && authorization.isAuth) ||
      accessToken
    ) {
      redirect(query);
    } else {
      setVerificationStep(false);
    }
    // }
  }, [location.search]);

  const getAccessToken = (accessToken: string, refreshToken: string) => {
    return accessToken;
  };

  const redirect = (query?: any) => {
    const _query = query || queryParam;
    const accessToken = cookies[`${props.realm}-access_token`];
    const refreshToken = cookies[`${props.realm}-refresh_token`];
    const outcome = validateToken(accessToken, refreshToken);

    httpPost(
      '/auth/token',
      {
        grant_type: 'refresh_token',
        realm: props.realm,
        refresh_token: refreshToken,
      },
      {
        headers: {
          authorization: accessToken,
        },
      }
    )
      .then((refreshTokenResponse) => {
        if (refreshTokenResponse.status === 200) {
          const newAccessToken = refreshTokenResponse.data.access_token;
          setCookies(
            `${props.realm}-access_token`,
            refreshTokenResponse.data.access_token
          );
          if (props.realm !== "100" && props.currentClient) {
            let appendString = '';
            Object.keys(_query).forEach((key) => {
              if (!['client', 'type'].includes(key)) {
                appendString += `&${key}=${_query[key]}`;
              }
            });
            window.location.href = `${props.currentClient.redirect}?access_token=${newAccessToken}&refresh_token=${refreshToken}&realm=${props.realm}${appendString}`;
          } else {
            sendMessage('loggedin', true);
            if (props.realm !== "100") {
              history(`/realm/${props.realm}/home`);
            } else {
              history('/managerealm');
            }
          }
        } else {
          removeCookie(`${props.realm}-access_token`);
          removeCookie(`${props.realm}-refresh_token`);
          setVerificationStep(false);
        }
      })
      .catch((error) => {
        removeCookie(`${props.realm}-access_token`);
        removeCookie(`${props.realm}-refresh_token`);
        setVerificationStep(false);
      });
  };

  const validateToken = (accessToken: string, refreshToken: string) => { };

  const redirectToRequestedClientIfTokenIsValid = (
    refreshToken: string,
    accessToken: string,
    queryString: any
  ) => {
    // const baseAuthUrl = `/auth/realm/${props.realm}`;
    //   httpGet(`/api/auth/token/decode`, {authorization: refreshAccessToken})
    //     .then((sessionResponse) => {
    //       console.log(sessionResponse);
    //       if (sessionResponse.status === 200) {
    //         redirectToRequestedClient(
    //           authKey,
    //           sessionResponse.data.token,
    //           queryString
    //         );
    //       } else {
    //         removeCookie(props.realm);
    //         setVerificationStep(false);
    //       }
    //     })
    //     .catch((error: any) => {
    //       removeCookie(props.realm);
    //       setVerificationStep(false);
    //     });
    // redirectToRequestedClient(authKey, sessionResponse.data.token, queryString);
  };

  return (
    <div className="login-form-container">
      {spinner && <>spinner</>}
      <NotificationMessage notification={notificationMessage} />

      {!verificationStep && type === 'signin' && (
        <div className="wrapper">
          <SigninPage
            switchToSignupPage={() => changeRoute('signup')}
            switchToResetPage={() => changeRoute('reset')}
            queryParam={queryParam}
            background={props.background}
            currentClient={props.currentClient}
            currentRealm={props.currentRealm}
            redirect={redirect}
            clientId={props.clientId}
            {...props}
          />
        </div>
      )}

      {!verificationStep && type === 'signup' && (
        <div className="wrapper">
          <NewUser
            switchToSigninPage={() => changeRoute('signin')}
            clientId={props.clientId}
            {...props}
          />
        </div>
      )}

      {!verificationStep && type === 'reset' && (
        <div className="wrapper">
          <ResetPassword
            {...props}
            authCode={authCode}
            switchToSigninPage={() => changeRoute('signin')}
          />
        </div>
      )}

      {!verificationStep && type === 'confirmemail' && (
        <div className="wrapper">
          <ConfirmEmail
            {...props}
            authCode={authCode}
            switchToSigninPage={() => changeRoute('signin')}
          />
        </div>
      )}

      {(verificationStep || !props.currentRealm) && <VerifySession />}
    </div>
  );
};

export default LoginFormContainer;
