import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import './Login.scss';
import { Authorization } from '../Types/GeneralTypes';
import OakText from '../../oakui/OakText';
import { sendMessage } from '../../events/MessageService';
import {
  signin,
  preSignin,
  sentPasswordChangeEmail,
  preSignup,
  signup,
} from './AuthService';
import { isEmptyOrSpaces } from '../Utils';
import OakButton from '../../oakui/OakButton';
import { httpPost, httpGet } from '../Lib/RestTemplate';

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
}

interface State {
  newuser: boolean;
  name: string;
  email: string;
  password: string;
  repeatpassword: string;
}

const Login = (props: Props) => {
  const [data, setData] = useState({
    newuser: false,
    name: '',
    email: '',
    password: '',
    repeatpassword: '',
    resetCode: '',
  });

  const [appId, setAppId] = useState('');

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
    props.setProfile({ ...props.profile, tenant: props.match.params.tenant });
  }, []);

  const signinAction = event => {
    event.preventDefault();
    sendMessage('notification', false);
    sendMessage('spinner');
    if (data.email && data.password) {
      httpPost(
        `/auth/${props.profile.tenant}/authorize`,
        {
          email: data.email,
          password: data.password,
        },
        null
      )
        .then((authorizeResponse: any) => {
          if (authorizeResponse.status === 200) {
            httpGet(
              `/auth/${props.profile.tenant}/session/${authorizeResponse.data.auth_key}`,
              null
            ).then(sessionResponse => {
              if (sessionResponse.status === 200) {
                sendMessage('notification', true, {
                  type: 'success',
                  message: 'logged in',
                });
                if (appId) {
                  httpGet(`/app/${appId}`, {
                    headers: {
                      Authorization: sessionResponse.data.token,
                    },
                  }).then(appResponse => {
                    window.location.href = `${appResponse.data.data.redirect}?authKey=${authorizeResponse.data.auth_key}&space=${props.profile.tenant}`;
                  });
                } else {
                  console.log('proceed to token fetch');
                }
              }
            });
          }
        })
        .catch((error: any) => {
          if (error.response.status === 404) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'User account does not exist',
              duration: 3000,
            });
          } else if (error.response.status === 401) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'User name / Password incorrect',
              duration: 3000,
            });
          }
        });
    } else {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Username/password cannot be empty',
        duration: 3000,
      });
    }
  };

  const signupAction = event => {
    event.preventDefault();
    sendMessage('notification', false);
    sendMessage('spinner');
    if (data.name && data.password && data.email) {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
        sendMessage('notification', true, {
          type: 'failure',
          message: 'Email ID is invalid',
          duration: 3000,
        });
        return;
      }

      httpPost(
        `/auth/${props.profile.tenant}/signup`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        null
      ).then((response: any) => {
        if (response.status === 200) {
          sendMessage('notification', true, {
            type: 'success',
            message: 'Your account has been setup',
            duration: 3000,
          });
        }
      });
    } else if (!data.name) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Name cannot be empty',
        duration: 3000,
      });
    } else if (!data.email) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Email cannot be empty',
        duration: 3000,
      });
    } else if (!data.password) {
      sendMessage('notification', true, {
        type: 'failure',
        message: 'Password cannot be empty',
        duration: 3000,
      });
    }
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

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const toggle = () => {
    setData({ ...data, newuser: !data.newuser });
  };

  const success = data => {
    props.addAuth({
      isAuth: true,
      token: data.token,
      secret: data.secret,
      name: data.name,
    });
    sendMessage('loggedin', true);
    props.cookies.set('isAuth', true);
    props.cookies.set('token', data.token);
    props.cookies.set('secret', data.secret);
    props.cookies.set('name', data.name);
    props.cookies.set('email', data.email);
    props.history.push('/');
  };

  return (
    <>
      <div className="login">
        {!data.newuser && (
          <div className="container">
            <form method="GET" onSubmit={signinAction} noValidate>
              <div className="form">
                <OakText
                  label="E-mail"
                  id="email"
                  data={data}
                  handleChange={e => handleChange(e)}
                />
                <OakText
                  label="Password"
                  type="password"
                  id="password"
                  data={data}
                  handleChange={e => handleChange(e)}
                />
              </div>
              <br />
              <OakButton
                variant="animate out"
                theme="primary"
                action={signinAction}
              >
                Sign In
              </OakButton>
              <br /> <br />
              Don&apos;t have an account?{' '}
              <OakButton
                theme="default"
                variant="animate in"
                small
                action={() => toggle()}
              >
                Sign Up
              </OakButton>
            </form>
            <br />
            <OakButton
              theme="default"
              variant="animate in"
              small
              action={sentEmailWithCode}
            >
              Forgot password ?
            </OakButton>
          </div>
        )}

        {data.newuser && (
          <div className="container">
            <form method="GET" onSubmit={signupAction} noValidate>
              <h1>Sign Up</h1>
              <div className="form">
                <OakText
                  label="Name"
                  id="name"
                  data={data}
                  handleChange={e => handleChange(e)}
                />
                <OakText
                  label="E-mail"
                  id="email"
                  data={data}
                  handleChange={e => handleChange(e)}
                />
                <OakText
                  label="Password"
                  type="password"
                  id="password"
                  data={data}
                  handleChange={e => handleChange(e)}
                />
                <OakText
                  label="Repeat Password"
                  type="password"
                  id="repeatpassword"
                  data={data}
                  handleChange={e => handleChange(e)}
                />
              </div>
              <br />
              <OakButton theme="primary" variant="block" action={signupAction}>
                Create Account
              </OakButton>
              <br /> <br />
              Already have an account?{' '}
              <OakButton theme="secondary" variant="block" action={toggle}>
                Sign In
              </OakButton>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(Login)
);
