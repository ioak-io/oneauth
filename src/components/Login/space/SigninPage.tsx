import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth } from '../../../actions/AuthActions';
import './style.scss';
import { Authorization } from '../../Types/GeneralTypes';
import OakTextPlain from '../../../oakui/OakTextPlain';
import { sendMessage } from '../../../events/MessageService';
import { sentPasswordChangeEmail } from '../../Auth/AuthService';
import { isEmptyOrSpaces } from '../../Utils';
import OakButton from '../../../oakui/OakButton';
import { httpPost, httpGet } from '../../Lib/RestTemplate';
import { fetchSpace } from '../../../actions/SpaceActions';
import { fetchApp } from '../../../actions/AppActions';
import fetchUsers from '../../../actions/OaUserAction';
import { fetchRoles } from '../../../actions/OaRoleActions';
import { setProfile } from '../../../actions/ProfileActions';
import OakIcon from '../../../oakui/OakIcon';

interface Props {
  setProfile: Function;
  getAuth: Function;
  addAuth: Function;
  cookies: any;
  history: any;
  profile: any;
  authorization: Authorization;
  appId: string;
  switchToSignupPage: any;
  switchToResetPage: any;
  isSpaceLogin: boolean;
  space: string;
}

const SigninPage = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const signinAction = event => {
    event.preventDefault();
    let baseAuthUrl = '/auth';
    if (props.isSpaceLogin) {
      baseAuthUrl = `/auth/${props.space}`;
    }
    const errorState = {
      email: '',
      password: '',
    };
    let error = false;
    sendMessage('notification', false);
    sendMessage('spinner');
    if (isEmptyOrSpaces(data.email)) {
      error = true;
      errorState.email = 'Cannot be empty';
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      error = true;
      errorState.email = 'Invalid email';
    }
    if (isEmptyOrSpaces(data.password)) {
      error = true;
      errorState.password = 'Cannot be empty';
    }
    if (!error) {
      httpPost(
        `${baseAuthUrl}/authorize`,
        {
          email: data.email,
          password: data.password,
        },
        null
      )
        .then((authorizeResponse: any) => {
          if (authorizeResponse.status === 200) {
            httpGet(
              `${baseAuthUrl}/session/${authorizeResponse.data.auth_key}`,
              null
            )
              .then(sessionResponse => {
                if (sessionResponse.status === 200) {
                  console.log(sessionResponse);
                  sendMessage('notification', true, {
                    type: 'success',
                    message: 'logged in',
                  });
                  if (props.isSpaceLogin && props.appId) {
                    props.cookies.set(
                      props.space,
                      authorizeResponse.data.auth_key
                    );
                    redirectToRequestedApp(authorizeResponse, sessionResponse);
                  } else {
                    success(authorizeResponse, sessionResponse);
                  }
                }
              })
              .catch((error: any) => {
                if (error.response.status === 404) {
                  sendMessage('notification', true, {
                    type: 'failure',
                    message: 'Invalid session token',
                    duration: 3000,
                  });
                } else if (error.response.status === 401) {
                  sendMessage('notification', true, {
                    type: 'failure',
                    message: 'Session expired',
                    duration: 3000,
                  });
                }
              });
          }
        })
        .catch((error: any) => {
          if (error.response.status === 404) {
            errorState.email = 'User account does not exist';
          } else if (error.response.status === 401) {
            errorState.password = 'Incorrect password';
          }
        })
        .finally(() => {
          setErrors(errorState);
          sendMessage('spinner', false);
        });
    } else {
      setErrors(errorState);
      sendMessage('spinner', false);
    }
  };

  const redirectToRequestedApp = (authorizeResponse, sessionResponse) => {
    httpGet(`/app/${props.appId}`, {
      headers: {
        Authorization: sessionResponse.data.token,
      },
    }).then(appResponse => {
      window.location.href = `${appResponse.data.data.redirect}?authKey=${authorizeResponse.data.auth_key}&space=${props.space}`;
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

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const success = (authorizeResponse, sessionResponse) => {
    sendMessage('loggedin', true);
    if (props.isSpaceLogin) {
      props.cookies.set(props.space, authorizeResponse.data.auth_key);
      props.history.push(`/space/${props.space}/home`);
      sendMessage('notification', true, {
        type: 'success',
        message: 'logged in to space',
        duration: 3000,
      });
    } else {
      // dispatch(fetchSpace(data));
      // dispatch(fetchApp(data));
      // dispatch(fetchUsers(data));
      // dispatch(fetchRoles(data));
      props.cookies.set('oneauth', authorizeResponse.data.auth_key);
      props.history.push('/');
      sendMessage('notification', true, {
        type: 'success',
        message: 'logged in to oneauth',
        duration: 3000,
      });
    }
  };

  return (
    <form method="GET" onSubmit={signinAction} noValidate className="login">
      <div className="form-signin">
        <div>
          <div className="label">
            {!errors.email && <div className="label-text">Email</div>}
            {errors.email && (
              <div className="error-text">
                <OakIcon mat="warning" color="warning" size="20px" />
                {errors.email}
              </div>
            )}
          </div>
          <OakTextPlain
            id="email"
            data={data}
            handleChange={e => handleChange(e)}
          />
        </div>
        <div>
          <div className="label">
            {!errors.password && <div className="label-text">Password</div>}
            {errors.password && (
              <div className="error-text">
                <OakIcon mat="warning" color="warning" size="20px" />
                {errors.password}
              </div>
            )}
            <div className="link" onClick={props.switchToResetPage}>
              Forgot Password?
            </div>
          </div>
          <OakTextPlain
            id="password"
            data={data}
            handleChange={e => handleChange(e)}
          />
        </div>
      </div>
      <div className="action">
        <OakButton variant="regular" theme="primary" action={signinAction}>
          Log In
        </OakButton>
        <p className="hr">or</p>
        <div className="button-link">
          <div className="link" onClick={props.switchToSignupPage}>
            Create an account
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth })(
  withCookies(SigninPage)
);
