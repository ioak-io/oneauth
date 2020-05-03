import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import './SpaceLogin.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';
import { sentPasswordChangeEmail } from '../Auth/AuthService';
import { isEmptyOrSpaces } from '../Utils';
import mirrorWhite from '../../images/ioak_white.svg';
import mirrorBlack from '../../images/ioak_black.svg';
import NewUser from './space/NewUser';
import SigninPage from './space/SigninPage';
import VerifySession from './space/VerifySession';
import { httpGet } from '../Lib/RestTemplate';

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

interface State {
  newuser: boolean;
  name: string;
  email: string;
  password: string;
  repeatpassword: string;
}

const Login = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [data, setData] = useState({
    newuser: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatpassword: '',
    resetCode: '',
  });

  const [appId, setAppId] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);

  useEffect(() => {
    setVerificationStep(true);
    let appIdRef = null;
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
      if (query && query.type === 'signup') {
        setData({ ...data, newuser: true });
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

  const sentEmailWithCode = () => {
    if (isEmptyOrSpaces(data.email)) {
      sendMessage('notification', true, {
        message: 'Email cannot be empty',
        type: 'failure',
        duration: 5000,
      });
      return;
    }

    sentPasswordChangeEmailAction('password');
  };

  const sentPasswordChangeEmailAction = type => {
    const min = 1;
    const max = 100;
    const rand = min + Math.random() * (max - min);
    sentPasswordChangeEmail(
      {
        email: data.email,
        resetCode: rand,
      },
      type
    )
      .then((response: any) => {
        if (response === 200) {
          if (type === 'password') {
            sendMessage('notification', true, {
              message: 'Password sent successfully',
              type: 'success',
              duration: 3000,
            });
          }
        } else {
          sendMessage('notification', true, {
            type: 'failure',
            message: 'Invalid Email error',
            duration: 3000,
          });
        }
      })
      .catch(error => {
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Bad request',
          duration: 3000,
        });
      });
  };

  const toggle = () => {
    setData({ ...data, newuser: !data.newuser });
  };

  return (
    <div className="space-login">
      <div className="overlay">
        <div className="container smooth-page">
          {props.profile.theme === 'theme_light' && (
            <img className="logo" src={mirrorBlack} alt="Mirror logo" />
          )}
          {props.profile.theme === 'theme_dark' && (
            <img className="logo" src={mirrorWhite} alt="Mirror logo" />
          )}

          {!verificationStep && !data.newuser && (
            <div className="wrapper">
              <SigninPage
                appId={appId}
                switchToSignupPage={toggle}
                isSpaceLogin
                {...props}
              />
            </div>
          )}

          {!verificationStep && data.newuser && (
            <div className="wrapper">
              <NewUser switchToSigninPage={toggle} isSpaceLogin {...props} />
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
