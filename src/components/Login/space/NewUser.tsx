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
  switchToSigninPage: any;
  isSpaceLogin: boolean;
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

  const signupAction = event => {
    event.preventDefault();
    let baseAuthUrl = '/auth';
    if (props.isSpaceLogin) {
      baseAuthUrl = `/auth/${props.space}`;
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
    sendMessage('spinner');
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
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
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
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
        null
      )
        .then((response: any) => {
          if (response.status === 200) {
            sendMessage('notification', true, {
              type: 'success',
              message: 'Your account has been setup',
              duration: 3000,
            });
            props.switchToSigninPage();
          } else {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Unknown error',
              duration: 3000,
            });
          }
        })
        .catch(e => {
          if (e.response.status === 403) {
            error = true;
            errorState.email = 'User account already exists';
          } else {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Unknown error',
              duration: 3000,
            });
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

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  return (
    <form method="GET" onSubmit={signupAction} noValidate className="login">
      <div className="form-signup">
        <div>
          <div className="label">
            {!errors.firstName && <div className="label-text">First Name</div>}
            {errors.firstName && (
              <div className="error-text">
                <OakIcon mat="warning" color="warning" size="20px" />
                {errors.firstName}
              </div>
            )}
          </div>
          <OakTextPlain
            id="firstName"
            data={data}
            handleChange={e => handleChange(e)}
          />
        </div>
        <div>
          <div className="label">
            {!errors.lastName && <div className="label-text">Last Name</div>}
            {errors.lastName && (
              <div className="error-text">
                <OakIcon mat="warning" color="warning" size="20px" />
                {errors.lastName}
              </div>
            )}
          </div>
          <OakTextPlain
            id="lastName"
            data={data}
            handleChange={e => handleChange(e)}
          />
        </div>
        <div>
          <div className="label">
            {!errors.email && <div className="label-text">E-mail</div>}
            {errors.email && (
              <div className="error-text">
                <OakIcon mat="warning" color="warning" size="20px" />
                {errors.email}
              </div>
            )}
          </div>
          <OakTextPlain
            id="email"
            placeholder="example@domain.com"
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

      <div className="action">
        <OakButton variant="regular" theme="primary" action={signupAction}>
          Create Account
        </OakButton>
        <p className="hr">or</p>
        <div className="button-link">
          <div className="link" onClick={props.switchToSigninPage}>
            Log In
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(NewUser)
);
