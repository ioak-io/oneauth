import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getAuth, addAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { httpGet, httpPost } from '../Lib/RestTemplate';
import { setProfile } from '../../actions/ProfileActions';
import { sendMessage } from '../../events/MessageService';
import { fetchSpace } from '../../actions/SpaceActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import { fetchApp } from '../../actions/AppActions';
import { fetchPermittedSpace } from '../../actions/PermittedSpaceAction';

interface Props {
  path?: string;
  render?: any;
  component: any;
  match: any;
  history: any;
  middleware?: string[];
  cookies: any;
}

const OakRoute = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(props.match.params.space);
  // }, []);
  // useEffect(() => {
  //   console.log(props.profile.appStatus, props.profile.loginPage);
  //   if (props.profile.appStatus === 'notmounted' && !props.profile.loginPage) {
  //     props.setProfile({
  //       space: props.match.params.space,
  //       appStatus: 'mounted',
  //     });
  //   } else {
  //     props.setProfile({ space: props.match.params.space });
  //   }
  //   middlewares(props.middleware);
  // }, []);

  // useEffect(() => {
  //   console.log(props.profile.appStatus, props.profile.loginPage);
  //   // middlewares(props.middleware);
  // }, []);

  // useEffect(() => {
  //   middlewares(props.middleware);
  // }, [props.profile.appStatus]);

  const middlewares = () => {
    // if (props.profile.appStatus === 'authenticated') {
    props.middleware?.forEach((middlewareName) => {
      if (!runMidleware(middlewareName)) {
        return false;
      }
    });
    return true;
    // }
  };

  const runMidleware = (middlewareName: string) => {
    sendMessage('spaceChange', true, '');
    switch (middlewareName) {
      case 'readAuthenticationSpace':
        return readAuthenticationSpace();
      case 'readAuthenticationAppspace':
        return readAuthenticationAppspace();
      case 'readAuthenticationOa':
        return readAuthenticationOa();
      case 'authenticateSpace':
        return authenticateSpace();
      case 'authenticateAppspace':
        return authenticateAppspace();
      case 'authenticateOa':
        return authenticateOa();
      case 'isAdmin':
        return isAdmin();
      default:
        return true;
    }
  };

  const authenticateOa = () => {
    return authenticate('oa');
  };
  const authenticateSpace = () => {
    return authenticate('space');
  };
  const authenticateAppspace = () => {
    return authenticate('appspace');
  };
  const readAuthenticationOa = () => {
    return authenticate('oa', false);
  };
  const readAuthenticationSpace = () => {
    return authenticate('space', false);
  };
  const readAuthenticationAppspace = () => {
    return authenticate('appspace', false);
  };

  const authenticate = (type: string, redirect = true) => {
    if (type === 'space') {
      sendMessage('spaceChange', true, props.match.params.space);
    } else if (type === 'appspace') {
      sendMessage('appspaceChange', true, props.match.params.space);
    }
    if (authorization.isAuth) {
      return true;
    }
    let accessToken = props.cookies.get('100-access_token');
    let refreshToken = props.cookies.get('100-refresh_token');
    let cookieKey = '100';
    if (type === 'space') {
      accessToken = props.cookies.get(
        `${props.match.params.space}-access_token`
      );
      refreshToken = props.cookies.get(
        `${props.match.params.space}-refresh_token`
      );
      cookieKey = props.match.params.space;
    } else if (type === 'appspace') {
      accessToken = props.cookies.get(
        `${props.match.params.appspace}-access_token`
      );
      refreshToken = props.cookies.get(
        `${props.match.params.appspace}-refresh_token`
      );
      cookieKey = props.match.params.appspace;
    }
    if (accessToken) {
      interpretAccessToken(
        cookieKey,
        accessToken,
        refreshToken,
        type,
        redirect
      );
    } else if (redirect) {
      // dispatch(setProfile({ ...profile, appStatus: 'authenticated' }));
      redirectHandler(type);
    } else {
      return true;
    }
  };

  const interpretAccessToken = (
    cookieKey: string,
    accessToken: string,
    refreshToken: string,
    type: string,
    redirect: boolean
  ) => {
    httpGet('/auth/token/decode', {
      headers: {
        authorization: accessToken,
      },
    })
      .then((decodedResponse) => {
        console.log(decodedResponse);
        if (decodedResponse.status === 200) {
          dispatch(
            addAuth({
              isAuth: true,
              access_token: accessToken,
              refresh_token: refreshToken,
              given_name: decodedResponse.data.given_name,
              family_name: decodedResponse.data.family_name,
              name: decodedResponse.data.name,
              nickname: decodedResponse.data.nickname,
              email: decodedResponse.data.email,
              type: decodedResponse.data.type,
              user_id: decodedResponse.data.user_id,
            })
          );
          if (type === 'oa') {
            // dispatch(fetchSpace());
            // dispatch(fetchUsers(sessionResponse.data));
            // dispatch(fetchRoles(sessionResponse.data));
            // dispatch(fetchApp(sessionResponse.data));
            // dispatch(fetchPermittedSpace(sessionResponse.data));
          }
          // dispatch(setProfile({ ...profile, appStatus: 'authenticated' }));
        } else {
          props.cookies.remove(`${cookieKey}-access_token`);
          props.cookies.remove(`${cookieKey}-refresh_token`);
        }
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          httpPost(
            '/auth/token',
            {
              grant_type: 'refresh_token',
              space: cookieKey,
              refresh_token: refreshToken,
            },
            {
              headers: {
                authorization: accessToken,
              },
            }
          )
            .then((refreshTokenResponse) => {
              if (refreshTokenResponse.status === 200) {
                props.cookies.set(
                  `${cookieKey}-access_token`,
                  refreshTokenResponse.data.access_token
                );
              } else {
                props.cookies.remove(`${cookieKey}-access_token`);
                props.cookies.remove(`${cookieKey}-refresh_token`);
              }
            })
            .catch((error) => {
              props.cookies.remove(`${cookieKey}-access_token`);
              props.cookies.remove(`${cookieKey}-refresh_token`);
            });
        } else {
          props.cookies.remove(`${cookieKey}-access_token`);
          props.cookies.remove(`${cookieKey}-refresh_token`);
          if (redirect && error.response.status === 404) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Invalid session token',
              duration: 3000,
            });
            redirectHandler(type);
          } else if (redirect && error.response.status === 401) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Session expired',
              duration: 3000,
            });
            redirectHandler(type);
          }
        }
      });
  };

  const redirectHandler = (type: string) => {
    switch (type) {
      case 'space':
        redirectToSpaceLogin(props.match.params.space);
        break;
      case 'appspace':
        redirectToAppspaceLogin(props.match.params.appspace);
        break;
      default:
        redirectToOaLogin();
    }
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToOaLogin = () => {
    // window.location.href = `http://localhost:3010/#/login`;
    props.history.push(`/login`);
  };

  const redirectToSpaceLogin = (spaceId: string) => {
    // window.location.href = `http://localhost:3010/#/space/${spaceId}/login`;
    props.history.push(`/space/${spaceId}/login`);
  };

  const redirectToAppspaceLogin = (appspaceId: string) => {
    // window.location.href = `http://localhost:3010/#/appspace/${appspaceId}/login`;
    props.history.push(`/appspace/${appspaceId}/login`);
  };

  const redirectToUnauthorized = () => {
    props.history.push(`/${profile.space}/unauthorized`);
  };

  return (
    <>
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          space={props.match.params.space}
          appspace={props.match.params.appspace}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRoute;
