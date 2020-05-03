import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getAuth, addAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import AuthInit from './AuthInit';
import { httpGet } from '../Lib/RestTemplate';
import { setProfile } from '../../actions/ProfileActions';
import { sendMessage } from '../../events/MessageService';
import { fetchSpace } from '../../actions/SpaceActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import { fetchApp } from '../../actions/AppActions';

interface Props {
  authorization: Authorization;
  path?: string;
  render?: any;
  component: any;
  match: any;
  history: any;
  middleware?: string[];
  cookies: any;
  logout: any;
}

const OakRoute = (props: Props) => {
  const authorization = useSelector(state => state.authorization);
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(props.match.params.tenant);
  // }, []);
  // useEffect(() => {
  //   console.log(props.profile.appStatus, props.profile.loginPage);
  //   if (props.profile.appStatus === 'notmounted' && !props.profile.loginPage) {
  //     props.setProfile({
  //       tenant: props.match.params.tenant,
  //       appStatus: 'mounted',
  //     });
  //   } else {
  //     props.setProfile({ tenant: props.match.params.tenant });
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
    console.log(props.middleware);
    props.middleware?.forEach(middlewareName => {
      if (!runMidleware(middlewareName)) {
        return false;
      }
    });
    return true;
    // }
  };

  const runMidleware = middlewareName => {
    switch (middlewareName) {
      case 'readAuthenticationSpace':
        return readAuthenticationSpace();
      case 'readAuthenticationOa':
        return readAuthenticationOa();
      case 'authenticateSpace':
        return authenticateSpace();
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
  const readAuthenticationOa = () => {
    return authenticate('oa', false);
  };
  const readAuthenticationSpace = () => {
    return authenticate('space', false);
  };

  const authenticate = (type, redirect = true) => {
    if (authorization.isAuth) {
      return true;
    }
    let baseAuthUrl = '/auth';
    let authKey = props.cookies.get('oneauth');
    let cookieKey = 'oneauth';
    if (type === 'space') {
      authKey = props.cookies.get(props.match.params.tenant);
      cookieKey = props.match.params.tenant;
      baseAuthUrl = `/auth/${props.match.params.tenant}`;
    }

    if (authKey) {
      httpGet(`${baseAuthUrl}/session/${authKey}`, null)
        .then(sessionResponse => {
          if (sessionResponse.status === 200) {
            dispatch(
              addAuth({
                isAuth: true,
                token: sessionResponse.data.token,
                secret: '',
                firstName: sessionResponse.data.firstName,
                lastName: sessionResponse.data.lastName,
                email: sessionResponse.data.email,
              })
            );
            if (type === 'oa') {
              dispatch(fetchSpace(sessionResponse.data));
              dispatch(fetchUsers(sessionResponse.data));
              dispatch(fetchRoles(sessionResponse.data));
              dispatch(fetchApp(sessionResponse.data));
            }
            // dispatch(setProfile({ ...profile, appStatus: 'authenticated' }));
          }
        })
        .catch((error: any) => {
          props.cookies.remove(cookieKey);
          if (redirect && error.response.status === 404) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Invalid session token',
              duration: 3000,
            });
            type === 'space'
              ? redirectToSpaceLogin(props.match.params.tenant)
              : redirectToOaLogin();
          } else if (redirect && error.response.status === 401) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Session expired',
              duration: 3000,
            });
            type === 'space'
              ? redirectToSpaceLogin(props.match.params.tenant)
              : redirectToOaLogin();
          }
        });
    } else if (redirect) {
      // dispatch(setProfile({ ...profile, appStatus: 'authenticated' }));
      type === 'space'
        ? redirectToSpaceLogin(props.match.params.tenant)
        : redirectToOaLogin();
    } else {
      return true;
    }
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToOaLogin = () => {
    window.location.href = `http://localhost:3010/#/login`;
  };

  const redirectToSpaceLogin = spaceId => {
    window.location.href = `http://localhost:3010/#/space/${spaceId}/login`;
  };

  const redirectToUnauthorized = () => {
    props.history.push(`/${profile.tenant}/unauthorized`);
  };

  return (
    <>
      {/* <AuthInit
        profile={props.profile}
        redirectIfNotAuthenticated={
          props.middleware && props.middleware.indexOf('isAuthenticated') !== -1
        }
      /> */}
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          space={props.match.params.tenant}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRoute;
