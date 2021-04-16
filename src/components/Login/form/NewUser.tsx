import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Warning } from '@material-ui/icons';
import { getAuth, addAuth, removeAuth } from '../../../actions/AuthActions';
import './style.scss';
import { Authorization } from '../../Types/GeneralTypes';
import { sendMessage } from '../../../events/MessageService';
import { isEmptyOrSpaces } from '../../Utils';
import { httpPost, httpGet } from '../../Lib/RestTemplate';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';

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
  space: string;
}

const NewUser = (props: Props) => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatpassword: '',
    resetCode: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatpassword: '',
  });

  const [stage, setStage] = useState('userdetails');

  const signupAction = (event) => {
    event.preventDefault();
    let baseAuthUrl = `/auth/${props.loginType}`;
    if (props.space) {
      baseAuthUrl = `${baseAuthUrl}/${props.space}`;
    }
    const errorState = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatpassword: '',
    };
    let error = false;
    sendMessage('notification', false);
    sendMessage('login-spinner');
    if (isEmptyOrSpaces(data.firstName)) {
      error = true;
      errorState.firstName = 'Cannot be empty';
    }
    if (isEmptyOrSpaces(data.lastName)) {
      error = true;
      errorState.lastName = 'Cannot be empty';
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
        `${baseAuthUrl}/signup`,
        {
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
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

  const handleChange = (detail: any) => {
    setData({ ...data, [detail.name]: detail.value });
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
              {!errors.firstName && (
                <div className="label-text">First Name</div>
              )}
              {errors.firstName && (
                <div className="error-text">
                  <Warning />
                  {errors.firstName}
                </div>
              )}
            </div>
            <OakInput
              disabled
              fill="invert"
              size="large"
              name="firstName"
              value={data.firstName}
              handleChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <div className="label">
              {!errors.lastName && <div className="label-text">Last Name</div>}
              {errors.lastName && (
                <div className="error-text">
                  <Warning />
                  {errors.lastName}
                </div>
              )}
            </div>
            <OakInput
              fill="invert"
              size="large"
              name="lastName"
              value={data.lastName}
              handleChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <div className="label">
              {!errors.email && <div className="label-text">E-mail</div>}
              {errors.email && (
                <div className="error-text">
                  <Warning />
                  {errors.email}
                </div>
              )}
            </div>
            <OakInput
              fill="invert"
              size="large"
              name="email"
              placeholder="example@domain.com"
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
            </div>
            <OakInput
              fill="invert"
              size="large"
              type="password"
              name="password"
              placeholder="Choose a strong password"
              value={data.password}
              handleChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <div className="label">
              {!errors.repeatpassword && (
                <div className="label-text">Retype password</div>
              )}
              {errors.repeatpassword && (
                <div className="error-text">
                  <Warning />
                  {errors.repeatpassword}
                </div>
              )}
            </div>
            <OakInput
              fill="invert"
              size="large"
              type="password"
              name="repeatpassword"
              placeholder="Don't forget it"
              value={data.repeatpassword}
              handleChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      )}

      <div className="action">
        {stage === 'userdetails' && (
          <>
            <OakButton
              fullWidth
              size="large"
              variant="regular"
              theme="primary"
              handleClick={signupAction}
            >
              Create Account
            </OakButton>
            <p className="hr">or</p>
          </>
        )}
        <div className="button-link">
          <div className="link" onClick={props.switchToSigninPage}>
            Log In
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(NewUser)
);
