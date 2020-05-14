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
  isSpaceLogin: boolean;
  authCode: string;
  switchToSigninPage: any;
  space: string;
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
      let baseAuthUrl = '/auth';
      if (props.isSpaceLogin) {
        baseAuthUrl = `/auth/${props.space}`;
      }
      httpPost(
        `${baseAuthUrl}/verifyemailconfirmationlink/${props.authCode}`,
        null,
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            setStage('confirmed');
          } else {
            setStage('invalidLink');
          }
        })
        .catch(() => {
          setStage('invalidLink');
        });
    }
  }, []);

  const [errors, setErrors] = useState({
    email: '',
  });

  const requestLink = event => {
    event.preventDefault();
    let baseAuthUrl = '/auth';
    if (props.isSpaceLogin) {
      baseAuthUrl = `/auth/${props.space}`;
    }
    const errorState = {
      email: '',
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
    if (!error) {
      httpPost(
        `${baseAuthUrl}/emailconfirmationlink`,
        {
          email: data.email,
        },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            setStage('linkSent');
            sendMessage('notification', true, {
              type: 'success',
              message: 'Email confirmation link sent to your email',
              duration: 3000,
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
        });
    } else {
      setErrors(errorState);
    }
    sendMessage('spinner', false);
  };

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = event => {
    if (stage === 'requestLink') {
      requestLink(event);
    }
  };

  return (
    <>
      <form method="GET" onSubmit={handleSubmit} noValidate className="login">
        {stage === 'invalidLink' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="warning" color="warning" size="2em" />
            Email confirmation link is invalid
          </div>
        )}
        {stage === 'confirmed' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="check_circle" color="success" size="2em" />
            Your email is confirmed. You can login now
          </div>
        )}
        {stage === 'linkSent' && (
          <div className="form-reset message typography-8">
            <OakIcon mat="check_circle" color="success" size="2em" />
            Account activation link has been sent to your email
          </div>
        )}
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
                placeholder="Email to activate"
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

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(ConfirmEmail)
);
