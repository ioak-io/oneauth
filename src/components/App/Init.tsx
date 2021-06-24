import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchAllSpaces } from '../../actions/SpaceActions';
import { setProfile } from '../../actions/ProfileActions';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import { fetchAllApps } from '../../actions/AppActions';
import { refreshAccessToken } from '../Auth/AuthService';
import { addAuth } from '../../actions/AuthActions';
import { axiosInstance, httpPost } from '../Lib/RestTemplate';

interface Props {
  cookies: any;
}
const Init = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const [previousAuthorizationState, setPreviousAuthorizationState] =
    useState<any>();
  const [space, setSpace] = useState<string>();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(authorization);
    if (authorization.isAuth) {
      // initializeHttpInterceptor();
    }
    if (
      authorization.isAuth &&
      authorization.isAuth !== previousAuthorizationState.isAuth
    ) {
      initializeHttpInterceptor();
      initialize();
    }
    setPreviousAuthorizationState(authorization);
  }, [authorization]);

  useEffect(() => {
    receiveMessage().subscribe((event: any) => {
      if (event.name === 'spaceChange') {
        setSpace(event.data);
      }
      if (event.name === 'spaceChange' && authorization.isAuth) {
        initialize();
      }
      if (event.name === 'access_token_expired') {
        console.log(authorization);
      }
    });
  }, []);

  useEffect(() => {
    document.body.addEventListener('mousedown', () => {
      sendMessage('usingMouse', true);
    });

    // Re-enable focus styling when Tab is pressed
    document.body.addEventListener('keydown', (event: any) => {
      if (event.keyCode === 9) {
        sendMessage('usingMouse', false);
      }
    });
  }, [profile]);

  useEffect(() => {
    if (profile.theme === 'theme_light') {
      document.body.style.backgroundColor = 'var(--color-global-lightmode)';
    } else {
      document.body.style.backgroundColor = 'var(--color-global-darkmode)';
    }
  }, [profile.theme]);

  const initialize = () => {
    console.log('Initialization logic here');
    dispatch(fetchAllSpaces());
    dispatch(fetchAllApps());
  };
  const initializeHttpInterceptor = () => {
    console.log('HTTP Interceptor initialization');
    axiosInstance.defaults.headers.authorization = authorization.access_token;
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status !== 401) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        httpPost(
          '/auth/token',
          {
            refresh_token: authorization.refresh_token,
            grant_type: 'refresh_token',
            space: space || 100,
          },
          null
        )
          .then((response) => {
            if (response.status === 200) {
              axiosInstance.defaults.headers.authorization =
                response.data.access_token;
              props.cookies.set(
                `${space || 100}-access_token`,
                response.data.access_token
              );
              dispatch(
                addAuth({
                  ...authorization,
                  access_token: response.data.access_token,
                })
              );
              if (!error.config._retry) {
                error.config._retry = true;
                error.config.headers.authorization = response.data.access_token;
                return axiosInstance(error.config);
              }
            } else {
              console.log('********redirect to login');
            }
          })
          .catch((error) => {
            Promise.reject(error);
          });
      }
    );
  };
  return <></>;
};

export default Init;
