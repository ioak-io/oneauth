import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAuth } from '../../store/actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';
import { httpPost } from '../Lib/RestTemplate';

interface Props {
  path?: string;
  render?: any;
  component: any;
  match: any;
  history: any;
  middleware?: string[];
  cookies: any;
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';

const OakRouteApp = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const middlewares = () => {
    props.middleware?.forEach((middlewareName) => {
      if (!runMidleware(middlewareName)) {
        return false;
      }
    });
    return true;
  };

  const runMidleware = (middlewareName: string) => {
    sendMessage('spaceChange', true, '');
    switch (middlewareName) {
      case 'readAuthentication':
        return readAuthenticationSpace();
      case 'authenticate':
        return authenticateSpace();
      case 'isAdmin':
        return isAdmin();
      default:
        return true;
    }
  };

  const authenticateSpace = () => {
    return authenticate('space');
  };
  const readAuthenticationSpace = () => {
    return authenticate('space', false);
  };
  const readSpace = () => {
    sendMessage('spaceChange', true, props.match.params.space);
  };

  const authenticate = async (type: string, redirect = true) => {
    sendMessage('spaceChange', true, props.match.params.space);
    if (authorization.isAuth) {
      if (
        props.match.params.space &&
        !authorization.space.includes(parseInt(props.match.params.space, 10))
      ) {
        console.log(
          '**redirect to unauthorized page',
          props.match.params.space
        );
        redirectToUnauthorized();
      }
      return true;
    }
    const accessToken = getSessionValue(`oneauth-access_token`);
    const refreshToken = getSessionValue(`oneauth-refresh_token`);
    if (accessToken && refreshToken) {
      httpPost(
        `/user/${appRealm}/authorize_user`,
        { accessToken, refreshToken },
        null
      )
        .then((response) => {
          if (response.status === 200) {
            let newAccessToken = accessToken;
            if (response.data.accessToken) {
              newAccessToken = response.data.accessToken;
              setSessionValue(`oneauth-access_token`, newAccessToken);
            }
            console.log(response.data);
            dispatch(
              addAuth({
                isAuth: true,
                ...response.data.claims,
                access_token: newAccessToken,
                space: response.data.space,
              })
            );
          }
        })
        .catch((error: any) => {
          removeSessionValue(`oneauth-access_token`);
          removeSessionValue(`oneauth-refresh_token`);
          if (redirect && error.response.status === 404) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Invalid session token',
              duration: 3000,
            });
            redirectToLogin(appRealm);
          } else if (redirect && error.response.status === 401) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Session expired',
              duration: 3000,
            });
            redirectToLogin(appRealm);
          }
        });
    } else if (redirect) {
      redirectToLogin(appRealm);
    } else {
      return true;
    }
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToLogin = (space: string) => {
    window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${appRealm}/login/${process.env.REACT_APP_ONEAUTH_APP_ID}`;
    // navigate(`/${space}/login/home`);
  };

  const redirectToUnauthorized = () => {
    navigate(`/${props.match.params.space}/unauthorized`);
  };

  return (
    <>
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          // space={appRealm}
          space={props.match.params.space}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRouteApp;
