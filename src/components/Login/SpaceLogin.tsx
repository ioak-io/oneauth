import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import './SpaceLogin.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import { sentPasswordChangeEmail } from '../Auth/AuthService';
import { isEmptyOrSpaces } from '../Utils';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';
import NewUser from './space/NewUser';
import SigninPage from './space/SigninPage';
import VerifySession from './space/VerifySession';
import { httpGet } from '../Lib/RestTemplate';
import ResetPassword from './space/ResetPassword';
import ConfirmEmail from './space/ConfirmEmail';
import OakSpinner from '../../oakui/OakSpinner';
import NotificationMessage from './space/NotificationMessage';

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
  space: string;
}

const Login = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [type, setType] = useState('signin');
  const [authCode, setAuthCode] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    type: '',
    message: '',
  });

  const [appId, setAppId] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);

  useEffect(() => {
    sendMessage('navbar', false);

    const eventBus = receiveMessage().subscribe(message => {
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

  useEffect(() => {
    setNotificationMessage({ type: '', message: '' });
  }, [type]);

  useEffect(() => {
    setVerificationStep(true);
    let appIdRef = null;
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
      if (query && query.type) {
        setType(query.type);
      }
      if (query && query.auth) {
        setAuthCode(query.auth);
      }
      if (query && query.appId) {
        setAppId(query.appId);
        appIdRef = query.appId;
      }
    }
    const authKey = props.cookies.get(props.space);
    if (authorization.isAuth || authKey) {
      if (appIdRef) {
        redirectToRequestedAppIfTokenIsValid(appIdRef, authKey);
      } else {
        props.history.push(`/space/${props.space}/home`);
      }
    } else {
      setVerificationStep(false);
    }
  }, []);

  const redirectToRequestedAppIfTokenIsValid = (appIdRef, authKey) => {
    console.log(appIdRef, authKey);
    const baseAuthUrl = `/auth/${props.space}`;

    httpGet(`${baseAuthUrl}/session/${authKey}`, null)
      .then(sessionResponse => {
        if (sessionResponse.status === 200) {
          redirectToRequestedApp(appIdRef, authKey, sessionResponse.data.token);
        } else {
          props.cookies.remove(props.space);

          setVerificationStep(false);
        }
      })
      .catch((error: any) => {
        props.cookies.remove(props.space);
        setVerificationStep(false);
      });
  };

  const redirectToRequestedApp = (appId, authKey, token) => {
    httpGet(`/app/${appId}`, {
      headers: {
        Authorization: token,
      },
    }).then(appResponse => {
      window.location.href = `${appResponse.data.data.redirect}?authKey=${authKey}&space=${props.space}`;
    });
  };

  return (
    <div className="space-login">
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
                appId={appId}
                switchToSignupPage={() => setType('signup')}
                switchToResetPage={() => setType('reset')}
                isSpaceLogin
                {...props}
              />
            </div>
          )}

          {!verificationStep && type === 'signup' && (
            <div className="wrapper">
              <NewUser
                switchToSigninPage={() => setType('signin')}
                isSpaceLogin
                {...props}
              />
            </div>
          )}

          {!verificationStep && type === 'reset' && (
            <div className="wrapper">
              <ResetPassword
                isSpaceLogin
                {...props}
                resetCode={authCode}
                switchToSigninPage={() => setType('signin')}
              />
            </div>
          )}

          {!verificationStep && type === 'confirmemail' && (
            <div className="wrapper">
              <ConfirmEmail
                isSpaceLogin
                {...props}
                authCode={authCode}
                switchToSigninPage={() => setType('signin')}
              />
            </div>
          )}

          {verificationStep && <VerifySession />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(Login)
);
