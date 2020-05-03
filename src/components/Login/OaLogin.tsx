import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { fetchSpace } from '../../actions/SpaceActions';
import { fetchApp } from '../../actions/AppActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import './OaLogin.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';
import { sentPasswordChangeEmail } from '../Auth/AuthService';
import { isEmptyOrSpaces } from '../Utils';
import mirrorWhite from '../../images/ioak_white.svg';
import mirrorBlack from '../../images/ioak_black.svg';
import SigninPage from './space/SigninPage';
import NewUser from './space/NewUser';
import VerifySession from './space/VerifySession';

const queryString = require('query-string');

interface Props {
  fetchRoles: Function;
  fetchUsers: Function;
  fetchSpace: Function;
  fetchApp: Function;
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
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
      if (query && query.type === 'signup') {
        setData({ ...data, newuser: true });
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
    <>
      <div className="oa-login smooth-page">
        <div className="side" />
        <div className="main">
          <div className="container">
            {props.profile.theme === 'theme_light' && (
              <img className="logo" src={mirrorBlack} alt="Mirror logo" />
            )}
            {props.profile.theme === 'theme_dark' && (
              <img className="logo" src={mirrorWhite} alt="Mirror logo" />
            )}
            {!verificationStep && !data.newuser && (
              <div className="wrapper">
                <SigninPage switchToSignupPage={toggle} {...props} />
              </div>
            )}
            {!verificationStep && data.newuser && (
              <div className="wrapper">
                <NewUser switchToSigninPage={toggle} {...props} />
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
});

export default connect(mapStateToProps, {
  getAuth,
  addAuth,
  removeAuth,
  fetchSpace,
  fetchUsers,
  fetchRoles,
  fetchApp,
})(withCookies(Login));
