import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAuth } from '../../store/actions/AuthActions';
import { httpGet, httpPost } from '../Lib/RestTemplate';
import { sendMessage } from '../../events/MessageService';
import { currentRealmEventSubject } from '../../events/CurrentRealmEvent';

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
    // sendMessage('realmChange', true, '');
    switch (middlewareName) {
      case 'readRealm':
        return readRealm();
      case 'authenticate':
        return authenticateRealm();
      case 'readAuthentication':
        return readAuthenticationRealm();
      case 'authenticateClientrealm':
        return authenticateClientrealm();
      case 'readAuthenticationClientrealm':
        return readAuthenticationClientrealm();
      default:
        return true;
    }
  };

  const readRealm = () => {
    const _realm = props.match.params.realm
      ? Number(props.match.params.realm)
      : 100;
    if (currentRealmEventSubject.value?.realm !== _realm) {
      httpGet(`/realm/${_realm}`, null).then((response) => {
        currentRealmEventSubject.next(response.data);
      });
    }
    setTimeout(() => {
      sendMessage(
        'realmChange',
        true,
        props.match.params.realm ? Number(props.match.params.realm) : 100
      );
    }, 0);
  };

  const authenticateRealm = () => {
    return authenticate('realm');
  };
  const authenticateClientrealm = () => {
    return authenticate('clientrealm');
  };
  const readAuthenticationRealm = () => {
    return authenticate('realm', false);
  };
  const readAuthenticationClientrealm = () => {
    return authenticate('clientrealm', false);
  };

  const authenticate = (type: string, redirect = true) => {
    const realm = props.match.params.realm || 100;
    if (authorization.isAuth && authorization.realm === realm) {
      return true;
    }
    const accessToken = props.cookies.get(`${realm}-access_token`);
    const refreshToken = props.cookies.get(`${realm}-refresh_token`);
    if (accessToken) {
      interpretAccessToken(realm, accessToken, refreshToken, type, redirect);
    } else if (redirect) {
      // dispatch(setProfile({ ...profile, clientStatus: 'authenticated' }));
      redirectHandler(type, realm);
    } else {
      return true;
    }
  };

  const interpretAccessToken = (
    realm: number,
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
            // sendMessage('realmChange', true, realm);
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
          removeSessionValue(`${realm}-access_token`);
          removeSessionValue(`${realm}-refresh_token`);
        }
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          httpPost(
            '/auth/token',
            {
              grant_type: 'refresh_token',
              realm,
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
                  `${realm}-access_token`,
                  refreshTokenResponse.data.access_token
                );
              } else {
                removeSessionValue(`${realm}-access_token`);
                removeSessionValue(`${realm}-refresh_token`);
              }
            })
            .catch((error) => {
              removeSessionValue(`${realm}-access_token`);
              removeSessionValue(`${realm}-refresh_token`);
            });
        } else {
          removeSessionValue(`${realm}-access_token`);
          removeSessionValue(`${realm}-refresh_token`);
          if (redirect && error.response.status === 404) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Invalid session token',
              duration: 3000,
            });
            redirectHandler(type, realm);
          } else if (redirect && error.response.status === 401) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Session expired',
              duration: 3000,
            });
            redirectHandler(type, realm);
          }
        }
      });
  };

  const redirectHandler = (type: string, realm: number) => {
    switch (type) {
      case 'realm':
        redirectToRealmLogin(realm);
        break;
      case 'clientrealm':
        redirectToClientrealmLogin(props.match.params.clientrealm);
        break;
      default:
        redirectToOaLogin();
    }
  };

  const redirectToOaLogin = () => {
    // window.location.href = `http://localhost:3010/#/login`;
    props.history(`/realm/100/login/oneauth`);
  };

  const redirectToRealmLogin = (realm: number) => {
    // window.location.href = `http://localhost:3010/#/realm/${realmId}/login`;
    console.log(realm);
    if (realm === 100) {
      props.history(`/realm/100/login/oneauth`);
    } else {
      props.history(`/realm/${realm}/login/oneauth`);
    }
  };

  const redirectToClientrealmLogin = (clientrealmId: string) => {
    // window.location.href = `http://localhost:3010/#/clientrealm/${clientrealmId}/login`;
    props.history(`/clientrealm/${clientrealmId}/login`);
  };

  const redirectToUnauthorized = () => {
    props.history(`/${profile.realm}/unauthorized`);
  };

  return (
    <>
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          realm={
            props.match.params.realm ? Number(props.match.params.realm) : 100
          }
          clientrealm={props.match.params.clientrealm}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRoute;
