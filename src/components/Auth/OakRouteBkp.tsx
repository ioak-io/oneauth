import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getAuth, addAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { httpGet, httpPost } from '../Lib/RestTemplate';
import { setProfile } from '../../actions/ProfileActions';
import { sendMessage } from '../../events/MessageService';
import { fetchRealm } from '../../actions/RealmActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import { fetchClient } from '../../actions/ClientActions';
import { fetchPermittedRealm } from '../../actions/PermittedRealmAction';

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
  //   console.log(props.match.params.realm);
  // }, []);
  // useEffect(() => {
  //   console.log(props.profile.clientStatus, props.profile.loginPage);
  //   if (props.profile.clientStatus === 'notmounted' && !props.profile.loginPage) {
  //     props.setProfile({
  //       realm: props.match.params.realm,
  //       clientStatus: 'mounted',
  //     });
  //   } else {
  //     props.setProfile({ realm: props.match.params.realm });
  //   }
  //   middlewares(props.middleware);
  // }, []);

  // useEffect(() => {
  //   console.log(props.profile.clientStatus, props.profile.loginPage);
  //   // middlewares(props.middleware);
  // }, []);

  // useEffect(() => {
  //   middlewares(props.middleware);
  // }, [props.profile.clientStatus]);

  const middlewares = () => {
    // if (props.profile.clientStatus === 'authenticated') {
    props.middleware?.forEach((middlewareName) => {
      if (!runMidleware(middlewareName)) {
        return false;
      }
    });
    return true;
    // }
  };

  const runMidleware = (middlewareName: string) => {
    sendMessage('realmChange', true, '');
    switch (middlewareName) {
      case 'readAuthenticationRealm':
        return readAuthenticationRealm();
      case 'setAdminRealm':
        return readAuthenticationClientrealm();
      case 'readAuthenticationOa':
        return readAuthenticationOa();
      case 'authenticateRealm':
        return authenticateRealm();
      case 'authenticateClientrealm':
        return authenticateClientrealm();
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
  const authenticateRealm = () => {
    return authenticate('realm');
  };
  const authenticateClientrealm = () => {
    return authenticate('clientrealm');
  };
  const readAuthenticationOa = () => {
    return authenticate('oa', false);
  };
  const readAuthenticationRealm = () => {
    return authenticate('realm', false);
  };
  const readAuthenticationClientrealm = () => {
    return authenticate('clientrealm', false);
  };

  const authenticate = (type: string, redirect = true) => {
    console.log(
      '(((((((((',
      type,
      authorization.isAuth,
      authorization.realm,
      props.match.params.realm
    );
    if (
      authorization.isAuth &&
      authorization.realm === (props.match.params.realm || 100)
    ) {
      return true;
    }
    let accessToken = props.cookies.get('100-access_token');
    let refreshToken = props.cookies.get('100-refresh_token');
    let cookieKey = '100';
    if (type === 'realm') {
      accessToken = props.cookies.get(
        `${props.match.params.realm}-access_token`
      );
      refreshToken = props.cookies.get(
        `${props.match.params.realm}-refresh_token`
      );
      cookieKey = props.match.params.realm;
    } else if (type === 'clientrealm') {
      accessToken = props.cookies.get(
        `${props.match.params.clientrealm}-access_token`
      );
      refreshToken = props.cookies.get(
        `${props.match.params.clientrealm}-refresh_token`
      );
      cookieKey = props.match.params.clientrealm;
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
      // dispatch(setProfile({ ...profile, clientStatus: 'authenticated' }));
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
              realm: props.match.params.realm || 100,
            })
          );
          if (type === 'clientrealm') {
            sendMessage('clientrealmChange', true, props.match.params.realm);
          } else {
            sendMessage('realmChange', true, props.match.params.realm || 100);
          }
          if (type === 'oa') {
            // dispatch(fetchRealm());
            // dispatch(fetchUsers(sessionResponse.data));
            // dispatch(fetchRoles(sessionResponse.data));
            // dispatch(fetchClient(sessionResponse.data));
            // dispatch(fetchPermittedRealm(sessionResponse.data));
          }
          // dispatch(setProfile({ ...profile, clientStatus: 'authenticated' }));
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
              realm: cookieKey,
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
      case 'realm':
        redirectToRealmLogin(props.match.params.realm);
        break;
      case 'clientrealm':
        redirectToClientrealmLogin(props.match.params.clientrealm);
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

  const redirectToRealmLogin = (realmId: string) => {
    // window.location.href = `http://localhost:3010/#/realm/${realmId}/login`;
    props.history.push(`/realm/${realmId}/login`);
  };

  const redirectToClientrealmLogin = (clientrealmId: string) => {
    // window.location.href = `http://localhost:3010/#/clientrealm/${clientrealmId}/login`;
    props.history.push(`/clientrealm/${clientrealmId}/login`);
  };

  const redirectToUnauthorized = () => {
    props.history.push(`/${profile.realm}/unauthorized`);
  };

  return (
    <>
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          realm={props.match.params.realm || 100}
          clientrealm={props.match.params.clientrealm}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRoute;