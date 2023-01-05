import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import { sendMessage } from '../../events/MessageService';
import { httpPost } from '../Lib/RestTemplate';
import { Authorization } from '../Types/GeneralTypes';
import { isEmptyOrSpaces } from '../Utils';
import OakForm from '../../oakui/wc/OakForm';
import OakButton from '../../oakui/wc/OakButton';

interface Props {
  switchToSigninPage: any;
  clientrealm: string;
  history: any;
  cookies: any;
  removeAuth: any;
}

const HomeLink = (props: Props) => {
  const loginType = 'clientrealm';
  const authorization = useSelector((state: any) => state.authorization);
  const [data, setData] = useState({
    email: '',
    password: '',
    repeatpassword: '',
  });

  const [stage, setStage] = useState('requestLink');

  const [errors, setErrors] = useState({
    email: '',
  });

  const handleChange = (detail: any) => {
    setData({ ...data, [detail.name]: detail.value });
  };

  const handleSubmit = (detail: any) => {
    if (stage === 'requestLink') {
      // requestLink(event);
    }
  };

  const changeRoute = (routeType) => {
    props.history(
      `/clientrealm/${props.clientrealm}/home?type=${routeType}`
    );
  };

  const login = () => {
    props.history(`/clientrealm/${props.clientrealm}/login?type=signin`);
  };

  const signup = () => {
    props.history(`/clientrealm/${props.clientrealm}/login?type=signup`);
  };

  const logout = () => {
    let baseAuthUrl = `/auth/${loginType}`;
    let authKey = props.cookies.get('oneauth');
    if (props.clientrealm) {
      authKey = props.cookies.get(props.clientrealm);
      baseAuthUrl = `${baseAuthUrl}/${props.clientrealm}`;
    }

    httpPost(`${baseAuthUrl}/session/${authKey}/invalidate`, null, null).then(
      (response: any) => {
        if (response.status === 200 || response.status === 404) {
          props.removeAuth();
          props.cookies.remove(props.clientrealm);
          props.history(`/clientrealm/${props.clientrealm}/home`);
          sendMessage('notification', true, {
            type: 'success',
            message: `Signed out of realm ${props.clientrealm}`,
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
        className="realm-home-link"
      >
        <div className="action">
          <div className="action-group">
            {authorization.isAuth && (
              <>
                <OakButton
                  variant="drama"
                  theme="primary"
                  handleClick={() => changeRoute('updateProfile')}
                  size="medium"
                >
                  Edit Profile
                </OakButton>
                <OakButton
                  variant="drama"
                  theme="primary"
                  size="medium"
                  handleClick={() => changeRoute('changePassword')}
                >
                  Change Password
                </OakButton>
                <OakButton
                  variant="appear"
                  theme="tertiary"
                  size="medium"
                  handleClick={logout}
                >
                  Sign out
                </OakButton>
              </>
            )}
            {!authorization.isAuth && (
              <>
                <OakButton variant="appear" theme="primary" handleClick={login}>
                  Sign in
                </OakButton>
                <OakButton
                  variant="appear"
                  theme="primary"
                  handleClick={signup}
                >
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
