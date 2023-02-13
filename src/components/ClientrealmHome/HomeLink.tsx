import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import { sendMessage } from '../../events/MessageService';
import { httpPost } from '../Lib/RestTemplate';
import { useNavigate } from 'react-router-dom';
import { getSessionValue, removeSessionValue } from '../../utils/SessionUtils';
import { removeAuth } from '../../store/actions/AuthActions';
import { useDispatch } from 'react-redux';
import { Button, ThemeType } from 'basicui';

interface Props {
  switchToSigninPage: any;
  clientrealm: string;
}

const HomeLink = (props: Props) => {
  const loginType = 'clientrealm';
  const history = useNavigate();
  const dispatch = useDispatch();
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

  const onInput = (event: any) => {
    setData({ ...data, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (detail: any) => {
    if (stage === 'requestLink') {
      // requestLink(event);
    }
  };

  const changeRoute = (routeType) => {
    history(
      `/clientrealm/${props.clientrealm}/home?type=${routeType}`
    );
  };

  const login = () => {
    history(`/clientrealm/${props.clientrealm}/login?type=signin`);
  };

  const signup = () => {
    history(`/clientrealm/${props.clientrealm}/login?type=signup`);
  };

  const logout = () => {
    let baseAuthUrl = `/auth/${loginType}`;
    let authKey = getSessionValue('oneauth');
    if (props.clientrealm) {
      authKey = getSessionValue(props.clientrealm);
      baseAuthUrl = `${baseAuthUrl}/${props.clientrealm}`;
    }

    httpPost(`${baseAuthUrl}/session/${authKey}/invalidate`, null, null).then(
      (response: any) => {
        if (response.status === 200 || response.status === 404) {
          dispatch(removeAuth());
          removeSessionValue(props.clientrealm);
          history(`/clientrealm/${props.clientrealm}/home`);
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
                <Button
                  theme={ThemeType.primary}
                  onClick={() => changeRoute('updateProfile')}
                >
                  Edit Profile
                </Button>
                <Button
                  theme={ThemeType.primary}
                  onClick={() => changeRoute('changePassword')}
                >
                  Change Password
                </Button>
                <Button
                  onClick={logout}
                >
                  Sign out
                </Button>
              </>
            )}
            {!authorization.isAuth && (
              <>
                <Button theme={ThemeType.primary} onClick={login}>
                  Sign in
                </Button>
                <Button
                  theme={ThemeType.primary}
                  onClick={signup}
                >
                  Sign up
                </Button>
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
