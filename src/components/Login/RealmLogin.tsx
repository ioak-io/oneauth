import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import './RealmLogin.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';
import NewUser from './form/NewUser';
import SigninPage from './form/SigninPage';
import VerifySession from './form/VerifySession';
import { httpGet } from '../Lib/RestTemplate';
import ResetPassword from './form/ResetPassword';
import ConfirmEmail from './form/ConfirmEmail';
import OakSpinner from '../../oakui/OakSpinner';
import NotificationMessage from './form/NotificationMessage';
import { loginPageSubject } from '../../events/LoginPageEvent';

const queryString = require('query-string');

interface Props {
  setProfile: Function;
  getAuth: Function;
  addAuth: Function;
  removeAuth: Function;
  cookies: any;
  history: any;
  profile: any;
  match: any;
  location: any;
  authorization: Authorization;
  realm: string;
}

const RealmLogin = (props: Props) => {
  const loginType = 'realm';
  const authorization = useSelector((state: any) => state.authorization);
  const [type, setType] = useState('signin');
  const [authCode, setAuthCode] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    type: '',
    message: '',
  });

  const [clientId, setClientId] = useState('');
  const [queryParam, setQueryParam] = useState<any>();
  const [verificationStep, setVerificationStep] = useState(false);

  useEffect(() => {
    loginPageSubject.next({ state: true });
    return () => {
      loginPageSubject.next({ state: false });
    };
  }, []);

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

  const changeRoute = (routeType) => {
    setNotificationMessage({ type: '', message: '' });
    props.history.push(`/realm/${props.realm}/login?type=${routeType}`);
  };

  useEffect(() => {
    setVerificationStep(true);
    let clientIdRef = null;
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
      setQueryParam({ ...query });
      console.log(query);
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
      if (query && query.clientId) {
        setClientId(query.clientId);
        clientIdRef = query.clientId;
      } else {
        setClientId('');
      }
    }
    const authKey = props.cookies.get(props.realm);
    if (authorization.isAuth || authKey) {
      if (clientIdRef) {
        redirectToRequestedClientIfTokenIsValid(
          clientIdRef,
          authKey,
          queryString.parse(props.location.search)
        );
      } else {
        props.history.push(`/realm/${props.realm}/home`);
      }
    } else {
      setVerificationStep(false);
    }
  }, [props.location.search]);

  const redirectToRequestedClientIfTokenIsValid = (
    clientIdRef,
    authKey,
    queryString
  ) => {
    console.log(clientIdRef, authKey);
    const baseAuthUrl = `/auth/realm/${props.realm}`;

    console.log('***********');
    console.log(authKey);
    httpGet(`${baseAuthUrl}/session/${authKey}`, null)
      .then((sessionResponse) => {
        console.log(sessionResponse);
        if (sessionResponse.status === 200) {
          redirectToRequestedClient(
            clientIdRef,
            authKey,
            sessionResponse.data.token,
            queryString
          );
        } else {
          props.cookies.remove(props.realm);

          setVerificationStep(false);
        }
      })
      .catch((error: any) => {
        props.cookies.remove(props.realm);
        setVerificationStep(false);
      });
  };

  const redirectToRequestedClient = (clientId, authKey, token, queryString) => {
    httpGet(`/client/${clientId}`, {
      headers: {
        Authorization: token,
      },
    }).then((clientResponse) => {
      let appendString = '';
      Object.keys(queryString).forEach((key) => {
        if (!['clientId', 'type'].includes(key)) {
          appendString += `&${key}=${queryString[key]}`;
        }
      });
      window.location.href = `${clientResponse.data.data.redirect}?authKey=${authKey}&realm=${props.realm}${appendString}`;
    });
  };

  return (
    <div className="realm-login">
      <div className="overlay">
        <div className="container smooth-page">
          {props.profile.theme === 'theme_light' && (
            <img className="logo" src={oneauthBlack} alt="Oneauth logo" />
          )}
          {props.profile.theme === 'theme_dark' && (
            <img className="logo" src={oneauthWhite} alt="Oneauth logo" />
          )}

          {spinner && <OakSpinner />}
          <NotificationMessage notification={notificationMessage} />

          {!verificationStep && type === 'signin' && (
            <div className="wrapper">
              <SigninPage
                clientId={clientId}
                switchToSignupPage={() => changeRoute('signup')}
                switchToResetPage={() => changeRoute('reset')}
                loginType={loginType}
                queryParam={queryParam}
                {...props}
              />
            </div>
          )}

          {!verificationStep && type === 'signup' && (
            <div className="wrapper">
              <NewUser
                switchToSigninPage={() => changeRoute('signin')}
                loginType={loginType}
                {...props}
              />
            </div>
          )}

          {!verificationStep && type === 'reset' && (
            <div className="wrapper">
              <ResetPassword
                loginType={loginType}
                {...props}
                authCode={authCode}
                switchToSigninPage={() => changeRoute('signin')}
              />
            </div>
          )}

          {!verificationStep && type === 'confirmemail' && (
            <div className="wrapper">
              <ConfirmEmail
                loginType={loginType}
                {...props}
                authCode={authCode}
                switchToSigninPage={() => changeRoute('signin')}
              />
            </div>
          )}

          {verificationStep && <VerifySession />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(RealmLogin)
);
