import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { fetchSpace } from '../../actions/SpaceActions';
import { fetchApp } from '../../actions/AppActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import { fetchAppSpace } from '../../actions/AppSpaceAction';
import './OaLogin.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';
import { sentPasswordChangeEmail } from '../Auth/AuthService';
import { isEmptyOrSpaces } from '../Utils';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';
import SigninPage from './space/SigninPage';
import NewUser from './space/NewUser';
import VerifySession from './space/VerifySession';
import ResetPassword from './space/ResetPassword';
import ConfirmEmail from './space/ConfirmEmail';

const queryString = require('query-string');

interface Props {
  fetchRoles: Function;
  fetchUsers: Function;
  fetchSpace: Function;
  fetchApp: Function;
  fetchAppSpace: Function;
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

  const [appId, setAppId] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);

  useEffect(() => {
    sendMessage('navbar', false);
  }, []);

  useEffect(() => {
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
      }
    }
    // props.setProfile({ ...props.profile, tenant: props.match.params.tenant });
  }, []);

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
            {!verificationStep && type === 'signin' && (
              <div className="wrapper">
                <SigninPage
                  switchToSignupPage={() => setType('signup')}
                  switchToResetPage={() => setType('reset')}
                  {...props}
                />
              </div>
            )}
            {!verificationStep && type === 'signup' && (
              <div className="wrapper">
                <NewUser
                  switchToSigninPage={() => setType('signin')}
                  {...props}
                />
              </div>
            )}

            {!verificationStep && type === 'reset' && (
              <div className="wrapper">
                <ResetPassword
                  {...props}
                  authCode={authCode}
                  switchToSigninPage={() => setType('signin')}
                />
              </div>
            )}

            {!verificationStep && type === 'confirmemail' && (
              <div className="wrapper">
                <ConfirmEmail
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
    </>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
  fetchSpace: state.fetchSpace,
  fetchUsers: state.fetchUsers,
  existingAdmins: state.fetchRoles,
  fetchApp: state.fetchApp,
  fetchAppSpace: state.fetchAppSpace,
});

export default connect(mapStateToProps, {
  getAuth,
  addAuth,
  removeAuth,
  fetchSpace,
  fetchUsers,
  fetchRoles,
  fetchApp,
  fetchAppSpace,
})(withCookies(Login));
