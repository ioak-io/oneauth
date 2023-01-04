import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../store/actions/AuthActions';
import './style.scss';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage, receiveMessage } from '../../events/MessageService';
import oneauthWhite from '../../images/oneauth_white.svg';
import oneauthBlack from '../../images/oneauth_black.svg';
import { httpGet } from '../Lib/RestTemplate';
import OakSpinner from '../../oakui/OakSpinner';
import NotificationMessage from '../LoginPage/form/NotificationMessage';
import HomeLink from './HomeLink';
import ChangePassword from './ChangePassword';
import UpdateProfile from './UpdateProfile';

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

const Login = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const [type, setType] = useState('home');
  const [spinner, setSpinner] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    type: '',
    message: '',
  });

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
    props.history.push(`/realm/${props.realm}/home?type=${routeType}`);
  };

  useEffect(() => {
    if (props.location.search) {
      const query = queryString.parse(props.location.search);
      if (query && query.type) {
        setType(query.type);
      } else {
        setType('home');
      }
    } else {
      setType('home');
    }
  }, [props.location.search]);

  return (
    <div className="realm-home">
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

          {type === 'home' && (
            <div className="wrapper">
              <HomeLink
                switchToSigninPage={() => changeRoute('signin')}
                {...props}
              />
            </div>
          )}

          {type === 'changePassword' && (
            <div className="wrapper">
              <ChangePassword goHome={() => changeRoute('home')} {...props} />
            </div>
          )}

          {type === 'updateProfile' && (
            <div className="wrapper">
              <UpdateProfile goHome={() => changeRoute('home')} {...props} />
            </div>
          )}

          {/* {!verificationStep && type === 'signup' && (
            <div className="wrapper">
              <NewUser
                switchToSigninPage={() => changeRoute('signin')}
                isRealmLogin
                {...props}
              />
            </div>
          )} */}

          {/* {!verificationStep && type === 'reset' && (
            <div className="wrapper">
              <ResetPassword
                isRealmLogin
                {...props}
                authCode={authCode}
                switchToSigninPage={() => changeRoute('signin')}
              />
            </div>
          )} */}

          {/* {!verificationStep && type === 'confirmemail' && (
            <div className="wrapper">
              <ConfirmEmail
                isRealmLogin
                {...props}
                authCode={authCode}
                switchToSigninPage={() => changeRoute('signin')}
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(Login)
);
