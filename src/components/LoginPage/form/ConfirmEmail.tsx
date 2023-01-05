import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Warning } from '@material-ui/icons';
import { getAuth, addAuth, removeAuth } from '../../../store/actions/AuthActions';
import './style.scss';
import { Authorization } from '../../Types/GeneralTypes';
import { sendMessage } from '../../../events/MessageService';
import { isEmptyOrSpaces } from '../../Utils';
import { httpPost, httpGet } from '../../Lib/RestTemplate';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';

interface Props {
  loginType: string;
  authCode: string;
  switchToSigninPage: any;
  realm: string;
}

const ConfirmEmail = (props: Props) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    repeatpassword: '',
  });

  const [stage, setStage] = useState('requestLink');

  //   const [] = useState('');
  useEffect(() => {
    if (props.authCode) {
      sendMessage('login-spinner');
      httpPost(
        '/auth/verify-email',
        { realm: props.realm || 100, code: props.authCode },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            setStage('confirmed');
            sendMessage('login-notification', true, {
              type: 'success-main',
              message:
                'Thank you for confirming your email. Your account is active. You can login now',
            });
          } else {
            setStage('invalidLink');
            sendMessage('login-notification', true, {
              type: 'failure-main',
              message: 'Email confirmation link you have entered is not valid',
            });
          }
        })
        .catch(() => {
          setStage('invalidLink');
          sendMessage('login-notification', true, {
            type: 'failure-main',
            message: 'Email confirmation link you have entered is not valid',
          });
        })
        .finally(() => sendMessage('login-spinner', false));
    }
  }, []);

  const [errors, setErrors] = useState({
    email: '',
  });

  const requestLink = (event) => {
    event.preventDefault();
    let baseAuthUrl = `/auth/${props.loginType}`;
    if (props.realm) {
      baseAuthUrl = `${baseAuthUrl}/${props.realm}`;
    }
    const errorState = {
      email: '',
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
        `${baseAuthUrl}/emailconfirmationlink`,
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
                'Account activation link has been sent to your email. Your account will be activated, post email confirmation. Please check your email for further instructions',
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

  const handleChange = (event) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (event) => {
    if (stage === 'requestLink') {
      requestLink(event);
    }
  };

  return (
    <>
      <form
        method="GET"
        onSubmit={handleSubmit}
        noValidate
        className="login account-page"
      >
        {/* {stage === 'invalidLink' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="warning" color="warning" size="2em" />
            Email confirmation link is invalid
          </div>
        )} */}
        {/* {stage === 'confirmed' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="check_circle" color="success" size="2em" />
            Your email is confirmed. You can login now
          </div>
        )} */}
        {/* {stage === 'linkSent' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="check_circle" color="success" size="2em" />
            Account activation link has been sent to your email
          </div>
        )} */}
        {stage === 'requestLink' && (
          <div className="form-reset">
            <div>
              <div className="label">
                {!errors.email && <div className="label-text">Email</div>}
                {errors.email && (
                  <div className="error-text">
                    <Warning />
                    {errors.email}
                  </div>
                )}
              </div>
              <OakInput
                color="invert"
                fill
                size="large"
                name="email"
                placeholder="Email to activate"
                value={data.email}
                handleChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        )}
        <div className="action">
          {stage === 'requestLink' && (
            <OakButton
              fullWidth
              size="large"
              variant="regular"
              theme="primary"
              handleClick={requestLink}
            >
              Send Link
            </OakButton>
          )}
          {['requestLink'].includes(stage) && <p className="hr">or</p>}
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

const mapStateToProps = (state) => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  ConfirmEmail
);
