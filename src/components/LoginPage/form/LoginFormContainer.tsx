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

  const [clientId, setClientId] = useState('');
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
    const authKey = props.cookies.get(`${props.realm}-access_token`);
    if (
      (props.realm === authorization.realm && authorization.isAuth) ||
      authKey
    ) {
      if (clientIdRef) {
        redirectToRequestedClientIfTokenIsValid(
          clientIdRef,
          authKey,
          queryString.parse(props.location.search)
        );
      } else {
        console.log(props.realm, typeof props.realm);
        props.realm === 100
          ? props.history.push('/managerealm')
          : props.history.push(`/realm/${props.realm}/home`);
      }
    } else {
      setVerificationStep(false);
    }
  }, [props.location.search]);

  const redirectToRequestedClientIfTokenIsValid = (
    clientIdRef: string,
    authKey: string,
    queryString: any
  ) => {
    const baseAuthUrl = `/auth/realm/${props.realm}`;

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

  const redirectToRequestedClient = (
    clientId: string,
    authKey: string,
    token: string,
    queryString: any
  ) => {
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
    <div className="login-form-container">
      {spinner && <>spinner</>}
      <NotificationMessage notification={notificationMessage} />

      {!verificationStep && type === 'signin' && (
        <div className="wrapper">
          <SigninPage
            clientId={clientId}
            switchToSignupPage={() => changeRoute('signup')}
            switchToResetPage={() => changeRoute('reset')}
            queryParam={queryParam}
            background={props.background}
            currentRealm={props.currentRealm}
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
