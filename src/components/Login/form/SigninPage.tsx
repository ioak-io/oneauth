import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Warning } from '@material-ui/icons';
import { getAuth, addAuth } from '../../../actions/AuthActions';
import './style.scss';
import { Authorization } from '../../Types/GeneralTypes';
import { newId, sendMessage } from '../../../events/MessageService';
import { isEmptyOrSpaces } from '../../Utils';
import { httpPost, httpGet } from '../../Lib/RestTemplate';
import OakButton from '../../../oakui/wc/OakButton';
import OakInput from '../../../oakui/wc/OakInput';
import OakForm from '../../../oakui/wc/OakForm';

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
  loginType: string;
  realm: string;
  queryParam: any;
}

const SigninPage = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [emailConfirmationLink, setEmailConfirmationLink] = useState('hide');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const signinAction = (detail: any) => {
    const errorState = {
      email: '',
      password: '',
    };
    let error = false;
    sendMessage('notification', false);
    sendMessage('login-spinner');
    setEmailConfirmationLink('hide');
    if (isEmptyOrSpaces(data.email)) {
      error = true;
      errorState.email = 'Cannot be empty';
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        data.email.trim().toLowerCase()
      )
    ) {
      error = true;
      errorState.email = 'Invalid email';
    }
    if (isEmptyOrSpaces(data.password)) {
      error = true;
      errorState.password = 'Cannot be empty';
    }
    if (!error) {
      const params = new URLSearchParams();
      params.append('email', data.email);
      params.append('password', data.password);
      params.append('response_type', 'token');
      params.append('realm', props.realm || '100');

      httpPost('/auth/authorize', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((authorizeResponse: any) => {
          if (authorizeResponse.status === 200) {
            if (props.realm) {
              props.cookies.set(
                `${props.realm}-access_token`,
                authorizeResponse.data.access_token
              );
              props.cookies.set(
                `${props.realm}-refresh_token`,
                authorizeResponse.data.refresh_token
              );
            } else {
              props.cookies.set(
                '100-access_token',
                authorizeResponse.data.access_token
              );
              props.cookies.set(
                '100-refresh_token',
                authorizeResponse.data.refresh_token
              );
            }
            if (props.realm && props.appId) {
              redirectToRequestedApp(
                authorizeResponse.data.access_token,
                authorizeResponse.data.refresh_token
              );
            } else {
              success(
                authorizeResponse.data.access_token,
                authorizeResponse.data.refresh_token
              );
            }
          }
        })
        .catch((error: any) => {
          if (error.response?.status === 404) {
            errorState.email = 'User account does not exist';
          } else if (error.response?.status === 401) {
            errorState.password = 'Incorrect password';
          } else if (error.response?.status === 403) {
            errorState.email = 'Email not confirmed';
            setEmailConfirmationLink('showLink');
          }
        })
        .finally(() => {
          setErrors(errorState);
          sendMessage('login-spinner', false);
        });
    } else {
      setErrors(errorState);
      sendMessage('login-spinner', false);
    }
  };

  // const getSession = (baseAuthUrl, authorizeResponse) => {
  //   console.log(authorizeResponse);
  //   if (authorizeResponse.status === 200) {
  //     httpGet(
  //       `${baseAuthUrl}/session/${authorizeResponse.data.sessionId}/decode`,
  //       null
  //     )
  //       .then((sessionResponse) => {
  //         if (sessionResponse.status === 200) {
  //           if (props.realm && props.appId) {
  //             props.cookies.set(props.realm, authorizeResponse.data.sessionId);
  //             redirectToRequestedApp(authorizeResponse, sessionResponse);
  //           } else {
  //             success(authorizeResponse, sessionResponse);
  //           }
  //         }
  //       })
  //       .catch((error: any) => {
  //         if (error.response.status === 404) {
  //           sendMessage('notification', true, {
  //             type: 'failure',
  //             message: 'Invalid session token',
  //             duration: 3000,
  //           });
  //         } else if (error.response.status === 401) {
  //           sendMessage('notification', true, {
  //             type: 'failure',
  //             message: 'Session expired',
  //             duration: 3000,
  //           });
  //         }
  //       });
  //   }
  // };

  const redirectToRequestedApp = (
    access_token: string,
    refresh_token: string
  ) => {
    httpGet(`/app/${props.appId}`, {
      headers: {
        Authorization: access_token,
      },
    }).then((appResponse) => {
      let appendString = '';
      Object.keys(props.queryParam).forEach((key) => {
        if (!['appId', 'type'].includes(key)) {
          appendString += `&${key}=${props.queryParam[key]}`;
        }
      });
      window.location.href = `${appResponse.data.data.redirect}?access_token=${access_token}&refresh_token=${refresh_token}&realm=${props.realm}${appendString}`;
    });
  };

  const handleChange = (detail: any) => {
    setData({ ...data, [detail.name]: detail.value });
  };

  const success = (access_token: string, refresh_token: string) => {
    sendMessage('loggedin', true);
    if (props.realm) {
      props.history.push(`/${props.loginType}/${props.realm}/home`);
    } else {
      // dispatch(fetchRealm(data));
      // dispatch(fetchApp(data));
      // dispatch(fetchUsers(data));
      // dispatch(fetchRoles(data));
      props.history.push('/');
    }
  };

  const resendActivationLink = () => {
    let baseAuthUrl = `/auth/${props.loginType}`;
    if (props.realm) {
      baseAuthUrl = `${baseAuthUrl}/${props.realm}`;
    }
    httpPost(
      '/auth/send-verify-email',
      {
        realm: props.realm || 100,
        email: data.email.trim().toLowerCase(),
      },
      null
    );
    setEmailConfirmationLink('showSent');
  };

  const onFacebookSignIn = (facebookProfile) => {
    if (facebookProfile?.access_token) {
      sendMessage('spinner');
      let baseAuthUrl = `/auth/${props.loginType}`;
      if (props.realm) {
        baseAuthUrl = `${baseAuthUrl}/${props.realm}`;
      }
      httpPost(
        `${baseAuthUrl}/authorize/facebook`,
        {
          email: facebookProfile.email,
          given_name: facebookProfile.first_name,
          family_name: facebookProfile.last_name,
        },
        null
      )
        .then((authorizeResponse: any) => {
          getSession(baseAuthUrl, authorizeResponse);
        })
        .finally(() => {
          sendMessage('notification', false);
          sendMessage('spinner', false);
        });
    }
  };

  const onGoogleSignIn = (googleProfile) => {
    if (googleProfile?.tokenId) {
      let baseAuthUrl = `/auth/${props.loginType}`;
      if (props.realm) {
        baseAuthUrl = `${baseAuthUrl}/${props.realm}`;
      }
      sendMessage('notification', false);
      sendMessage('spinner');
      httpPost(
        `${baseAuthUrl}/authorize/google/${googleProfile.tokenId}`,
        null,
        null
      )
        .then((authorizeResponse: any) => {
          getSession(baseAuthUrl, authorizeResponse);
        })
        .finally(() => {
          sendMessage('notification', false);
          sendMessage('spinner', false);
        });
    }
  };

  const formId = newId();

  return (
    <OakForm handleSubmit={signinAction} formGroupName={formId}>
      <div className="login account-page">
        <div className="form-signin">
          <div>
            <div className="label">
              {!errors.email && <div className="label-text">Email</div>}
              {errors.email && (
                <div className="error-text">
                  <Warning />
                  {errors.email}
                </div>
              )}
              {emailConfirmationLink === 'showLink' && (
                <div className="link" onClick={resendActivationLink}>
                  Resend confirmation link
                </div>
              )}
              {emailConfirmationLink === 'showSent' && (
                <>Activation link sent</>
              )}
            </div>
            <OakInput
              formGroupName={formId}
              fill
              color="invert"
              size="large"
              name="email"
              value={data.email}
              handleChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <div className="label">
              {!errors.password && <div className="label-text">Password</div>}
              {errors.password && (
                <div className="error-text">
                  <Warning />
                  {errors.password}
                </div>
              )}
              <div className="link" onClick={props.switchToResetPage}>
                Forgot Password?
              </div>
            </div>
            <OakInput
              formGroupName={formId}
              fill
              color="invert"
              size="large"
              name="password"
              type="password"
              value={data.password}
              handleChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="action">
          <OakButton
            formGroupName={formId}
            fullWidth
            variant="regular"
            theme="primary"
            size="large"
            type="submit"
          >
            Log In
          </OakButton>
          <p className="hr">or</p>
          <div className="button-link">
            <div className="link" onClick={props.switchToSignupPage}>
              Create an account
            </div>
          </div>
        </div>
        <div className="realm-top-3 social-signin">
          <div className="social-signin-container">
            <div className="social-google">
              <GoogleLogin
                clientId="81306451496-fg67eb502dvfb50c31huhkbn481bi29h.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={onGoogleSignIn}
                onFailure={onGoogleSignIn}
                onAutoLoadFinished={onGoogleSignIn}
              />
            </div>
            <div className="social-facebook">
              <FacebookLogin
                appId="696666571109190"
                textButton="Facebook"
                fields="name,email,picture,first_name,last_name"
                onClick={onFacebookSignIn}
                callback={onFacebookSignIn}
                icon="fa-facebook-square"
              />
            </div>
          </div>
        </div>
      </div>
    </OakForm>
  );
};

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth })(
  withCookies(SigninPage)
);
