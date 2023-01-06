import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import { sendMessage } from '../../events/MessageService';
import { httpPost } from '../Lib/RestTemplate';
import { Authorization } from '../Types/GeneralTypes';
import { isEmptyOrSpaces } from '../Utils';
import OakInput from '../../oakui/wc/OakInput';
import OakButton from '../../oakui/wc/OakButton';
import { getSessionValue, removeSessionValue } from '../../utils/SessionUtils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {
  switchToSigninPage: any;
  realm: string;
}

const HomeLink = (props: Props) => {
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

  const handleSubmit = () => {
    if (stage === 'requestLink') {
      // requestLink(event);
    }
  };

  const changeRoute = (routeType: string) => {
    history(`/realm/${props.realm}/home?type=${routeType}`);
  };

  const login = () => {
    history(`/realm/${props.realm}/login?type=signin`);
  };

  const signup = () => {
    history(`/realm/${props.realm}/login?type=signup`);
  };

  const logout = () => {
    let baseAuthUrl = '/auth/oa';
    let authKey = getSessionValue('oneauth');
    if (props.realm) {
      authKey = getSessionValue(props.realm);
      baseAuthUrl = `/auth/realm/${props.realm}`;
    }

    httpPost(`${baseAuthUrl}/session/${authKey}/invalidate`, null, null).then(
      (response: any) => {
        if (response.status === 200 || response.status === 404) {
          dispatch(removeAuth());
          removeSessionValue(props.realm);
          history(`/realm/${props.realm}/home`);
          sendMessage('notification', true, {
            type: 'success',
            message: `Signed out of realm ${props.realm}`,
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
                >
                  Edit Profile
                </OakButton>
                <OakButton
                  variant="drama"
                  theme="primary"
                  handleClick={() => changeRoute('changePassword')}
                >
                  Change Password
                </OakButton>
                <OakButton
                  variant="appear"
                  theme="tertiary"
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
