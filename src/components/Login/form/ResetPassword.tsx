import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../../actions/AuthActions';
import './style.scss';
import { Authorization } from '../../Types/GeneralTypes';
import OakTextPlain from '../../../oakui/OakTextPlain';
import { sendMessage } from '../../../events/MessageService';
import { isEmptyOrSpaces } from '../../Utils';
import OakButton from '../../../oakui/OakButton';
import { httpPost, httpGet } from '../../Lib/RestTemplate';
import OakIcon from '../../../oakui/OakIcon';

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
  loginType: string;
  authCode: string;
  switchToSigninPage: any;
  space: string;
}

const ResetPassword = (props: Props) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    repeatpassword: '',
  });

  const [stage, setStage] = useState('requestLink');

  //   const [] = useState('');
  useEffect(() => {
    if (props.authCode) {
      let baseAuthUrl = `/auth/${props.loginType}`;
      if (props.space) {
        baseAuthUrl = `${baseAuthUrl}/${props.space}`;
      }
      sendMessage('login-spinner');
      httpPost(
        `${baseAuthUrl}/verifypasswordlink/${props.authCode}`,
        {
          password: data.password,
        },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            setStage('setPassword');
          } else {
            setStage('invalidLink');
            sendMessage('login-notification', true, {
              type: 'failure-main',
              message: 'Password reset link you have entered is invalid',
            });
          }
        })
        .catch(() => {
          setStage('invalidLink');
          sendMessage('login-notification', true, {
            type: 'failure-main',
            message: 'Password reset link you have entered is invalid',
          });
        })
        .finally(() => sendMessage('login-spinner', false));
    }
  }, []);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    repeatpassword: '',
  });

  const requestLink = event => {
    event.preventDefault();
    let baseAuthUrl = `/auth/${props.loginType}`;
    if (props.space) {
      baseAuthUrl = `${baseAuthUrl}/${props.space}`;
    }
    const errorState = {
      email: '',
      password: '',
      repeatpassword: '',
    };
    let error = false;
    sendMessage('notification', false);
    sendMessage('login-spinner');
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
    if (!error) {
      httpPost(
        `${baseAuthUrl}/resetpasswordlink`,
        {
          email: data.email.trim().toLowerCase(),
        },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            setStage('linkSent');
            sendMessage('login-notification', true, {
              type: 'email-main',
              message:
                'Link to reset your password has been sent to your email. Please check your email for further instructions',
            });
          } else {
            errorState.email = 'Invalid user email';
          }
        })
        .catch(() => {
          error = true;
          errorState.email = 'User account does not exist';
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

  const resetPassword = event => {
    event.preventDefault();
    sendMessage('login-spinner');
    let baseAuthUrl = `/auth/${props.loginType}`;
    if (props.space) {
      baseAuthUrl = `${baseAuthUrl}/${props.space}`;
    }
    const errorState = {
      email: '',
      password: '',
      repeatpassword: '',
    };
    let error = false;
    if (isEmptyOrSpaces(data.password)) {
      error = true;
      errorState.password = 'Cannot be empty';
    }
    if (data.password !== data.repeatpassword) {
      error = true;
      errorState.repeatpassword = 'Password does not match';
    }
    setErrors(errorState);
    if (!error) {
      httpPost(
        `${baseAuthUrl}/resetpassword/${props.authCode}`,
        {
          password: data.password,
        },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            setStage('passwordUpdated');
            sendMessage('login-notification', true, {
              type: 'success-main',
              message:
                'Password has been updated. You can login with your new password now',
            });
          }
        })
        .finally(() => sendMessage('login-spinner', false));
    } else {
      sendMessage('login-spinner', false);
    }
  };

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = event => {
    if (stage === 'setPassword') {
      resetPassword(event);
    } else if (stage === 'requestLink') {
      requestLink(event);
    }
  };

  return (
    <>
      <form method="GET" onSubmit={handleSubmit} noValidate className="login">
        {/* {stage === 'invalidLink' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="warning" color="warning" size="2em" />
            Password reset link is invalid
          </div>
        )} */}
        {/* {stage === 'passwordUpdated' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="check_circle" color="success" size="2em" />
            Password updated
          </div>
        )} */}
        {/* {stage === 'linkSent' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="check_circle" color="success" size="2em" />
            Link to reset your password has been sent to your email
          </div>
        )} */}
        {stage === 'requestLink' && (
          <div className="form-reset">
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
                placeholder="Email to send reset link"
                data={data}
                handleChange={e => handleChange(e)}
              />
            </div>
          </div>
        )}
        {stage === 'setPassword' && (
          <div className="form-reset">
            <div>
              <div className="label">
                {!errors.password && (
                  <div className="label-text">Set new password</div>
                )}
                {errors.password && (
                  <div className="error-text">
                    <OakIcon mat="warning" color="warning" size="20px" />
                    {errors.password}
                  </div>
                )}
              </div>
              <OakTextPlain
                type="password"
                id="password"
                placeholder="Choose a strong password"
                data={data}
                handleChange={e => handleChange(e)}
              />
            </div>
            <div>
              <div className="label">
                {!errors.repeatpassword && (
                  <div className="label-text">Retype password</div>
                )}
                {errors.repeatpassword && (
                  <div className="error-text">
                    <OakIcon mat="warning" color="warning" size="20px" />
                    {errors.repeatpassword}
                  </div>
                )}
              </div>
              <OakTextPlain
                type="password"
                id="repeatpassword"
                placeholder="Don't forget it"
                data={data}
                handleChange={e => handleChange(e)}
              />
            </div>
          </div>
        )}
        <div className="action">
          {stage === 'requestLink' && (
            <OakButton variant="regular" theme="primary" action={requestLink}>
              Send Link
            </OakButton>
          )}
          {stage === 'setPassword' && (
            <OakButton variant="regular" theme="primary" action={resetPassword}>
              Update Password
            </OakButton>
          )}
          {['setPassword', 'requestLink'].includes(stage) && (
            <p className="hr">or</p>
          )}
          <div className="button-link">
            <div className="link" onClick={props.switchToSigninPage}>
              Log In
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(ResetPassword)
);
