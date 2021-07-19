import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import './LoginFormContainer.scss';
import { sendMessage, receiveMessage } from '../../../events/MessageService';
import NewUser from '../form/NewUser';
import SigninPage from '../form/SigninPage';
import VerifySession from '../form/VerifySession';
import { httpGet } from '../../Lib/RestTemplate';
import ResetPassword from '../form/ResetPassword';
import ConfirmEmail from '../form/ConfirmEmail';
import NotificationMessage from '../form/NotificationMessage';
import { loginPageSubject } from '../../../events/LoginPageEvent';

const queryString = require('query-string');

interface Props {
  cookies: any;
  history: any;
  match: any;
  location: any;
  realm: number;
  background?: 'image' | 'light' | 'dark';
  currentRealm: any;
  currentClient: any;
}

const LoginFormContainer = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
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
    props.history.push(`/realm/${props.realm}/login?type=${routeType}`);
  };

  useEffect(() => {
    setVerificationStep(true);
    // let clientRef = null;
    // if (props.location.search) {
    const query = queryString.parse(props.location.search);
    setQueryParam({ ...query });
    if (query && query.type) {
      setType(query.type);
    } else {
      setType('signin');
    }
    if (query && query.auth) {
      setAuthCode(query.auth);
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
    const accessToken = props.cookies.get(`${props.realm}-access_token`);
    if (
      (props.realm === authorization.realm && authorization.isAuth) ||
      accessToken
    ) {
      redirect(query);
    } else {
      setVerificationStep(false);
    }
    // }
  }, [props.location.search]);

  const redirect = (query?: any) => {
    const _query = query || queryParam;
    const accessToken = props.cookies.get(`${props.realm}-access_token`);
    const refreshToken = props.cookies.get(`${props.realm}-refresh_token`);
    if (props.realm !== 100 && props.currentClient) {
      let appendString = '';
      Object.keys(_query).forEach((key) => {
        if (!['client', 'type'].includes(key)) {
          appendString += `&${key}=${_query[key]}`;
        }
      });
      window.location.href = `${props.currentClient.redirect}?access_token=${accessToken}&refresh_token=${refreshToken}&realm=${props.realm}${appendString}`;
    } else {
      sendMessage('loggedin', true);
      if (props.realm !== 100) {
        props.history.push(`/realm/${props.realm}/home`);
      } else {
        props.history.push('/managerealm');
      }
    }
  };

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
    //         props.cookies.remove(props.realm);
    //         setVerificationStep(false);
    //       }
    //     })
    //     .catch((error: any) => {
    //       props.cookies.remove(props.realm);
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
            {...props}
          />
        </div>
      )}

      {!verificationStep && type === 'signup' && (
        <div className="wrapper">
          <NewUser
            switchToSigninPage={() => changeRoute('signin')}
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
