import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Settings } from '@material-ui/icons';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { fetchSpace } from '../../actions/SpaceActions';
import { fetchApp } from '../../actions/AppActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import { fetchPermittedSpace } from '../../actions/PermittedSpaceAction';
import './OaLogin.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import { sentPasswordChangeEmail } from '../Auth/AuthService';
import { isEmptyOrSpaces } from '../Utils';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';
import SigninPage from './form/SigninPage';
import NewUser from './form/NewUser';
import VerifySession from './form/VerifySession';
import ResetPassword from './form/ResetPassword';
import ConfirmEmail from './form/ConfirmEmail';
import OakSpinner from '../../oakui/OakSpinner';
import NotificationMessage from './form/NotificationMessage';

const queryString = require('query-string');

interface Props {
  fetchRoles: Function;
  fetchUsers: Function;
  fetchSpace: Function;
  fetchApp: Function;
  fetchPermittedSpace: Function;
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
}

const Login = (props: Props) => {
  const loginType = 'oa';
  const authorization = useSelector((state) => state.authorization);
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
    props.history.push(`/login?type=${routeType}`);
  };

  useEffect(() => {
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
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
      } else {
        setAppId('');
      }
    }
    // props.setProfile({ ...props.profile, tenant: props.match.params.tenant });
  }, [props.location.search]);

  useEffect(() => {
    setVerificationStep(true);
    const authKey = props.cookies.get('oneauth');
    if (authorization.isAuth || authKey) {
      props.history.push(`/home`);
    } else {
      setVerificationStep(false);
    }
  }, []);

  return (
    <>
      <div className="oa-login smooth-page">
        <div className="side" />
        <div className="main">
          <div className="container">
            {props.profile.theme === 'theme_light' && (
              <img className="logo" src={oneauthBlack} alt="Oneauth logo" />
            )}
            {props.profile.theme === 'theme_dark' && (
              <img className="logo" src={oneauthWhite} alt="Oneauth logo" />
            )}
            <div className="admin-console-header">
              <Settings />
              <div>Admin Console</div>
            </div>
            {spinner && <OakSpinner />}
            <NotificationMessage notification={notificationMessage} />

            {!verificationStep && type === 'signin' && (
              <div className="wrapper">
                <SigninPage
                  switchToSignupPage={() => changeRoute('signup')}
                  switchToResetPage={() => changeRoute('reset')}
                  loginType={loginType}
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
                  {...props}
                  authCode={authCode}
                  switchToSigninPage={() => changeRoute('signin')}
                  loginType={loginType}
                />
              </div>
            )}

            {!verificationStep && type === 'confirmemail' && (
              <div className="wrapper">
                <ConfirmEmail
                  {...props}
                  authCode={authCode}
                  switchToSigninPage={() => changeRoute('signin')}
                  loginType={loginType}
                />
              </div>
            )}

            {verificationStep && <VerifySession />}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  fetchSpace: state.fetchSpace,
  fetchUsers: state.fetchUsers,
  existingAdmins: state.fetchRoles,
  fetchApp: state.fetchApp,
  fetchPermittedSpace: state.fetchPermittedSpace,
});

export default connect(mapStateToProps, {
  getAuth,
  addAuth,
  removeAuth,
  fetchSpace,
  fetchUsers,
  fetchRoles,
  fetchApp,
  fetchPermittedSpace,
})(withCookies(Login));
