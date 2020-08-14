import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import { sendMessage } from '../../events/MessageService';
import { httpPost } from '../Lib/RestTemplate';
import { Authorization } from '../Types/GeneralTypes';
import { isEmptyOrSpaces } from '../Utils';
import OakButton from '../../oakui/OakButton';
import OakTextPlain from '../../oakui/OakTextPlain';
import OakIcon from '../../oakui/OakIcon';

interface Props {
  switchToSigninPage: any;
  space: string;
  history: any;
  cookies: any;
  removeAuth: any;
}

const HomeLink = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const [data, setData] = useState({
    email: '',
    password: '',
    repeatpassword: '',
  });

  const [stage, setStage] = useState('requestLink');

  const [errors, setErrors] = useState({
    email: '',
  });

  const handleChange = event => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = event => {
    if (stage === 'requestLink') {
      // requestLink(event);
    }
  };

  const changeRoute = routeType => {
    props.history.push(`/space/${props.space}/home?type=${routeType}`);
  };

  const login = () => {
    props.history.push(`/space/${props.space}/login?type=signin`);
  };

  const signup = () => {
    props.history.push(`/space/${props.space}/login?type=signup`);
  };

  const logout = () => {
    let baseAuthUrl = '/auth/oa';
    let authKey = props.cookies.get('oneauth');
    if (props.space) {
      authKey = props.cookies.get(props.space);
      baseAuthUrl = `/auth/space/${props.space}`;
    }

    httpPost(`${baseAuthUrl}/session/${authKey}/invalidate`, null, null).then(
      (response: any) => {
        if (response.status === 200 || response.status === 404) {
          props.removeAuth();
          props.cookies.remove(props.space);
          props.history.push(`/space/${props.space}/home`);
          sendMessage('notification', true, {
            type: 'success',
            message: `Signed out of space ${props.space}`,
            duration: 3000,
          });
        }
      }
    );
  };

  return (
    <>
      <form
        method="GET"
        onSubmit={handleSubmit}
        noValidate
        className="space-home-link"
      >
        <div className="action">
          <div className="action-group">
            {authorization.isAuth && (
              <>
                <OakButton
                  variant="drama"
                  theme="primary"
                  action={() => changeRoute('updateProfile')}
                >
                  Edit Profile
                </OakButton>
                <OakButton
                  variant="drama"
                  theme="primary"
                  action={() => changeRoute('changePassword')}
                >
                  Change Password
                </OakButton>
                <OakButton variant="appear" theme="tertiary" action={logout}>
                  Sign out
                </OakButton>
              </>
            )}
            {!authorization.isAuth && (
              <>
                <OakButton variant="appear" theme="primary" action={login}>
                  Sign in
                </OakButton>
                <OakButton variant="appear" theme="primary" action={signup}>
                  Sign up
                </OakButton>
              </>
            )}
          </div>
          {/* {['requestLink'].includes(stage) && <p className="hr">or</p>}
          <div className="button-link">
            <div className="link" onClick={props.switchToSigninPage}>
              Log In
            </div>
          </div> */}
        </div>
      </form>
    </>
  );
};

export default HomeLink;
