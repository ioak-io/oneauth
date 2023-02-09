import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './SigninPage.scss';
import { Authorization } from '../../Types/GeneralTypes';
import { newId, sendMessage } from '../../../events/MessageService';
import { isEmptyOrSpaces } from '../../Utils';
import { httpPost, httpGet } from '../../Lib/RestTemplate';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { useNavigate } from 'react-router-dom';
import { getSessionValue, setSessionValue } from '../../../utils/SessionUtils';
import { Link } from 'basicui';

interface Props {
  switchToSignupPage: any;
  switchToResetPage: any;
  loginType: string;
  realm: number;
  queryParam: any;
  background?: 'image' | 'light' | 'dark';
  currentRealm: any;
  currentClient: any;
  redirect: any;
  clientId: string;
}

const SigninPage = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const history = useNavigate();

  const [formElementVariant, setFormElementVariant] =
    useState<'default' | 'fixed-light' | 'fixed-dark'>('default');

  useEffect(() => {
    if (props.background && props.currentRealm) {
      setFormElementVariant(getFormElementVariant());
    }
  }, [props.background, props.currentRealm]);

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const el = document.getElementById('signin-username');
    if (el) {
      el.focus();
    }
  }, []);

  const [emailConfirmationLink, setEmailConfirmationLink] = useState('hide');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const signinAction = (event: any) => {
    event.preventDefault();
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
      params.append('realm', props.realm.toString());

      httpPost('/auth/authorize', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((authorizeResponse: any) => {
          if (authorizeResponse.status === 200) {
            setSessionValue(
              `${props.realm}-access_token`,
              authorizeResponse.data.access_token
            );
            setSessionValue(
              `${props.realm}-refresh_token`,
              authorizeResponse.data.refresh_token
            );
            console.log("**", getSessionValue(`${props.realm}-access_token`));
            props.redirect();
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

  const onInput = (event: any) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const resendActivationLink = () => {
    httpPost(
      '/auth/send-verify-email',
      {
        realm: props.realm,
        email: data.email.trim().toLowerCase(),
      },
      null
    );
    setEmailConfirmationLink('showSent');
  };

  const onFacebookSignIn = (facebookProfile: any) => {
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
          // getSession(baseAuthUrl, authorizeResponse);
        })
        .finally(() => {
          sendMessage('notification', false);
          sendMessage('spinner', false);
        });
    }
  };

  const onGoogleSignIn = (googleProfile: any) => {
    console.log('old-google-', googleProfile);
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
          // getSession(baseAuthUrl, authorizeResponse);
        })
        .finally(() => {
          sendMessage('notification', false);
          sendMessage('spinner', false);
        });
    }
  };

  const getFormElementVariant = ():
    | 'default'
    | 'fixed-dark'
    | 'fixed-light' => {
    if (props.currentRealm.site.container) {
      return 'default';
    }
    if (props.background === 'dark') {
      return 'fixed-dark';
    }
    if (props.background === 'image') {
      return 'fixed-light';
    }
    return 'default';
  };

  const formId = newId();

  return (
    <form onSubmit={signinAction}>
      <div className="signin-page">
        <div
          className={`signin-page__form ${props.currentRealm.site.layout === 'full' &&
              props.currentRealm.site.container
              ? `signin-page__form--container signin-page__form--container--radius-${props.currentRealm.site.borderRadius}`
              : ''
            }`}
        >
          {['top-one-line', 'top-two-line'].includes(
            props.currentRealm.site.signupVariant
          ) && (
              <div
                className={`signin-page__action-header ${props.currentRealm.site.signupVariant}`}
              >
                <div
                  className={`signin-page__action-header__left login-form-static-text-${props.background === 'light' ||
                      props.currentRealm.site.container
                      ? 'dark'
                      : 'light'
                    }`}
                >
                  Sign In
                </div>
                <div
                  className={`signin-page__action-header__right login-form-static-text-${props.background === 'light' ||
                      props.currentRealm.site.container
                      ? 'dark'
                      : 'light'
                    }`}
                >
                  <span className="signin-page__action__register__label">Or</span>
                  <Link
                    href={`/#/realm/${props.realm}/login?type=signup`}
                  >
                    Create account
                  </Link>
                </div>
              </div>
            )}
          <div className="signin-page__form-group">
            <div className="signin-page__form-group__label">
              {!errors.email && (
                <div
                  className={`login-form-label-text-${props.background === 'light' ||
                      props.currentRealm.site.container
                      ? 'dark'
                      : 'light'
                    }`}
                >
                  Username or Email Address
                </div>
              )}
              {errors.email && (
                <div className="error-text">
                  {/* <Warning /> */}
                  <FontAwesomeIcon icon={faExclamationTriangle} />
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
            <FormInput
              radius={props.currentRealm.site.borderRadius}
              variant={formElementVariant}
              name="email"
              onInput={onInput}
              type="text"
              value={data.email}
              autoFocus
              id="signin-username"
            />
          </div>
          <div className="signin-page__form-group">
            <div className="signin-page__form-group__label">
              {!errors.password && (
                <div
                  className={`login-form-label-text-${props.background === 'light' ||
                      props.currentRealm.site.container
                      ? 'dark'
                      : 'light'
                    }`}
                >
                  Password
                </div>
              )}
              {errors.password && (
                <div className="error-text">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.password}
                </div>
              )}
            </div>
            <FormInput
              radius={props.currentRealm.site.borderRadius}
              variant={formElementVariant}
              name="password"
              onInput={onInput}
              type="password"
              value={data.password}
            />
          </div>

          <div className="signin-page__form-group">
            <FormButton
              radius={props.currentRealm.site.borderRadius}
              onClick={signinAction}
              type="submit"
            >
              Sign in
            </FormButton>
          </div>
          <div className="signin-page__action__reset">
            <Link
              href={`/#/realm/${props.realm}/login/${props.clientId}?type=reset`}
            >
              Forgot password?
            </Link>
          </div>

          {props.currentRealm.site.signupVariant === 'bottom' && (
            <div
              className={`signin-page__action__register login-form-static-text-${props.background === 'light' ||
                  props.currentRealm.site.container
                  ? 'dark'
                  : 'light'
                }`}
            >
              <span className="signin-page__action__register__label">
                Don&apos;t have an account?
              </span>
              <Link
                href={`/#/realm/${props.realm}/login/${props.clientId}?type=signup`}
              >
                Create account
              </Link>
            </div>
          )}
        </div>
        <div className="signin-page__action">
          {/* <div
            className={`signin-page__action__register login-form-static-text-${
              props.background === 'light' ? 'dark' : 'light'
            }`}
          >
            <span className="signin-page__action__register__label">
              Don&apos;t have an account?
            </span>
            <a
              href={`/#/realm/${props.realm}/login?type=signup`}
              className={linkCompose({
                baseClass: 'login-form-hyperlink',
                underlineThickness: 'thin',
                dotted: true,
                underlineStyle: 'always',
              })}
            >
              Sign up
            </a>
          </div> */}
          {!props.currentRealm.site.container && <hr className="divider" />}
          <div className="realm-top-3 social-signin">
            <div
              className={`social-signin-container social-signin-container--radius-${props.currentRealm.site.borderRadius}`}
            >
              <div className="social-google">
                <GoogleLogin
                  clientId="1077172074629-cum4ech3o2sp9paqt7nubfcq02vfa6l9.apps.googleusercontent.com"
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
      </div>
    </form>
  );
};

export default SigninPage;
