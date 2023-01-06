import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {
  realm: string;
}

const RealmHome = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const history = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const profile = useSelector((state: any) => state.profile);
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
    history(`/realm/${props.realm}/home?type=${routeType}`);
  };

  useEffect(() => {
    if (searchParams.has('type')) {
      setType(searchParams.get('type') || '');
    } else {
      setType('home');
    }
  }, [searchParams]);

  return (
    <div className="realm-home">
      <div className="overlay">
        <div className="container smooth-page">
          {profile.theme === 'theme_light' && (
            <img className="logo" src={oneauthBlack} alt="Oneauth logo" />
          )}
          {profile.theme === 'theme_dark' && (
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

export default RealmHome;
