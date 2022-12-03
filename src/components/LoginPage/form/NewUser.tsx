import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { compose as linkCompose } from '@oakui/core-stage/style-composer/OakLinkComposer';
import './style.scss';
import { Authorization } from '../../Types/GeneralTypes';
import { sendMessage } from '../../../events/MessageService';
import { isEmptyOrSpaces } from '../../Utils';
import { httpPost, httpGet } from '../../Lib/RestTemplate';
import FormInput from './FormInput';
import FormButton from './FormButton';

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
  switchToSigninPage: any;
  loginType: string;
  realm: string;
  clientId: string;
}

const NewUser = (props: Props) => {
  const [data, setData] = useState({
    given_name: '',
    family_name: '',
    email: '',
    password: '',
    repeatpassword: '',
    resetCode: '',
  });

  const [errors, setErrors] = useState({
    given_name: '',
    family_name: '',
    email: '',
    password: '',
    repeatpassword: '',
  });

  const [stage, setStage] = useState('userdetails');

  const signupAction = (event: any) => {
    event.preventDefault();
    const errorState = {
      given_name: '',
      family_name: '',
      email: '',
      password: '',
      repeatpassword: '',
    };
    let error = false;
    sendMessage('notification', false);
    sendMessage('login-spinner');
    if (isEmptyOrSpaces(data.given_name)) {
      error = true;
      errorState.given_name = 'Cannot be empty';
    }
    if (isEmptyOrSpaces(data.family_name)) {
      error = true;
      errorState.family_name = 'Cannot be empty';
    }
    if (isEmptyOrSpaces(data.email)) {
      error = true;
      errorState.email = 'Cannot be empty';
    }
    if (
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
    if (data.password !== data.repeatpassword) {
      error = true;
      errorState.repeatpassword = 'Password does not match';
    }
    if (!error) {
      httpPost(
        '/auth/signup',
        {
          given_name: data.given_name.trim(),
          family_name: data.family_name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
          realm: props.realm || 100,
        },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            // sendMessage('notification', true, {
            //   type: 'success',
            //   message: 'Your account has been setup',
            //   duration: 3000,
            // });
            // props.switchToSigninPage();
            setStage('created');
            sendMessage('login-notification', true, {
              type: 'email-main',
              message:
                'Your account has been setup. Your account will be activated after you confirm your email. Please check your email for further instructions',
            });
          } else {
            sendMessage('login-notification', true, {
              type: 'failure',
              message: 'Unknown error',
            });
          }
        })
        .catch((e) => {
          if (e.response?.status === 403) {
            error = true;
            errorState.email = 'User account already exists';
          } else {
            sendMessage('login-notification', true, {
              type: 'failure',
              message: 'Unknown error',
            });
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

  const handleChange = (event: any) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (detail: any) => {
    if (stage === 'userdetails') {
      signupAction(detail);
    }
  };

  return (
    <form
      method="GET"
      onSubmit={handleSubmit}
      noValidate
      className="login account-page"
    >
      {stage === 'userdetails' && (
        <div className="form-signup">
          <div>
            <div className="label">
              {!errors.given_name && (
                <div className="label-text">First Name</div>
              )}
              {errors.given_name && (
                <div className="error-text">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.given_name}
                </div>
              )}
            </div>
            <FormInput
              name="given_name"
              handleChange={handleChange}
              type="text"
              value={data.given_name}
              autoFocus
            />
          </div>
          <div>
            <div className="label">
              {!errors.family_name && (
                <div className="label-text">Last Name</div>
              )}
              {errors.family_name && (
                <div className="error-text">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.family_name}
                </div>
              )}
            </div>
            <FormInput
              name="family_name"
              handleChange={handleChange}
              type="text"
              value={data.family_name}
            />
          </div>
          <div>
            <div className="label">
              {!errors.email && <div className="label-text">E-mail</div>}
              {errors.email && (
                <div className="error-text">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.email}
                </div>
              )}
            </div>
            <FormInput
              name="email"
              handleChange={handleChange}
              type="text"
              value={data.email}
            />
          </div>
          <div>
            <div className="label">
              {!errors.password && <div className="label-text">Password</div>}
              {errors.password && (
                <div className="error-text">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.password}
                </div>
              )}
            </div>
            <FormInput
              name="password"
              handleChange={handleChange}
              type="password"
              value={data.password}
            />
          </div>
          <div>
            <div className="label">
              {!errors.repeatpassword && (
                <div className="label-text">Retype password</div>
              )}
              {errors.repeatpassword && (
                <div className="error-text">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {errors.repeatpassword}
                </div>
              )}
            </div>
            <FormInput
              name="repeatpassword"
              handleChange={handleChange}
              type="password"
              value={data.repeatpassword}
            />
          </div>
        </div>
      )}

      <div className="action">
        {stage === 'userdetails' && (
          <>
            <FormButton type="button" handleClick={signupAction}>
              Create Account
            </FormButton>
            <hr className="divider" />
          </>
        )}
        <div className="signin-page__action__register">
          <span className="signin-page__action__register__label">
            Already a member?
          </span>
          <a
            href={`/#/realm/${props.realm}/login/${props.clientId}?type=signin`}
            className={linkCompose({
              color: 'primary',
              underlineThickness: 'thin',
            })}
          >
            Sign in now
          </a>
        </div>
      </div>
    </form>
  );
};

export default NewUser;
