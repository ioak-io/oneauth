import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import './AppspaceLogin.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import { sentPasswordChangeEmail } from '../Auth/AuthService';
import { isEmptyOrSpaces } from '../Utils';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';
import NewUser from './appspace/NewUser';
import SigninPage from './appspace/SigninPage';
import VerifySession from './appspace/VerifySession';
import { httpGet } from '../Lib/RestTemplate';
import ResetPassword from './appspace/ResetPassword';
import ConfirmEmail from './appspace/ConfirmEmail';
import OakSpinner from '../../oakui/OakSpinner';
import NotificationMessage from './appspace/NotificationMessage';

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
  appspace: string;
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
  const [queryParam, setQueryParam] = useState<any>();
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

  const changeRoute = routeType => {
    setNotificationMessage({ type: '', message: '' });
    props.history.push(`/appspace/${props.appspace}/login?type=${routeType}`);
  };

  useEffect(() => {
    setVerificationStep(true);
    let appIdRef = null;
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
      if (query && query.appId) {
        setAppId(query.appId);
        appIdRef = query.appId;
      } else {
        setAppId('');
      }
    }
    const authKey = props.cookies.get(props.appspace);
    if (authorization.isAuth || authKey) {
      if (appIdRef) {
        redirectToRequestedAppIfTokenIsValid(
          appIdRef,
          authKey,
          queryString.parse(props.location.search)
        );
      } else {
        props.history.push(`/appspace/${props.appspace}/home`);
      }
    } else {
      setVerificationStep(false);
    }
  }, [props.location.search]);

  const redirectToRequestedAppIfTokenIsValid = (
    appIdRef,
    authKey,
    queryString
  ) => {
    console.log(appIdRef, authKey);
    const baseAuthUrl = `/auth/app/${props.appspace}`;

    httpGet(`${baseAuthUrl}/session/${authKey}`, null)
      .then(sessionResponse => {
        if (sessionResponse.status === 200) {
          redirectToRequestedApp(
            appIdRef,
            authKey,
            sessionResponse.data.token,
            queryString
          );
        } else {
          props.cookies.remove(props.appspace);

          setVerificationStep(false);
        }
      })
      .catch((error: any) => {
        props.cookies.remove(props.appspace);
        setVerificationStep(false);
      });
  };

  const redirectToRequestedApp = (appId, authKey, token, queryString) => {
    httpGet(`/app/${appId}`, {
      headers: {
        Authorization: token,
      },
    }).then(appResponse => {
      let appendString = '';
      Object.keys(queryString).forEach(key => {
        if (!['appId', 'type'].includes(key)) {
          appendString += `&${key}=${queryString[key]}`;
        }
      });
      window.location.href = `${appResponse.data.data.redirect}?authKey=${authKey}&appspace=${props.appspace}${appendString}`;
    });
  };

  return (
    <div className="appspace-login">
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
                switchToSignupPage={() => changeRoute('signup')}
                switchToResetPage={() => changeRoute('reset')}
                isAppSpaceLogin
                queryParam={queryParam}
                {...props}
              />
            </div>
          )}

          {!verificationStep && type === 'signup' && (
            <div className="wrapper">
              <NewUser
                switchToSigninPage={() => changeRoute('signin')}
                isAppSpaceLogin
                {...props}
              />
            </div>
          )}

          {!verificationStep && type === 'reset' && (
            <div className="wrapper">
              <ResetPassword
                isAppSpaceLogin
                {...props}
                authCode={authCode}
                switchToSigninPage={() => changeRoute('signin')}
              />
            </div>
          )}

          {!verificationStep && type === 'confirmemail' && (
            <div className="wrapper">
              <ConfirmEmail
                isAppSpaceLogin
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

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(Login)
);
