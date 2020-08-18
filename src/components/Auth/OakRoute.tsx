import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getAuth, addAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { httpGet } from '../Lib/RestTemplate';
import { setProfile } from '../../actions/ProfileActions';
import { sendMessage } from '../../events/MessageService';
import { fetchSpace } from '../../actions/SpaceActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import { fetchApp } from '../../actions/AppActions';
import { fetchPermittedSpace } from '../../actions/PermittedSpaceAction';

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

  const authenticate = (type, redirect = true) => {
    if (type === 'space') {
      sendMessage('spaceChange', true, props.match.params.space);
    } else if (type === 'appspace') {
      sendMessage('appspaceChange', true, props.match.params.space);
    }
    if (authorization.isAuth) {
      return true;
    }
    let baseAuthUrl = `/auth/${type}`;
    let authKey = props.cookies.get('oneauth');
    let cookieKey = 'oneauth';
    if (type === 'space') {
      authKey = props.cookies.get(props.match.params.space);
      cookieKey = props.match.params.space;
      baseAuthUrl = `${baseAuthUrl}/${props.match.params.space}`;
    } else if (type === 'appspace') {
      authKey = props.cookies.get(props.match.params.appspace);
      cookieKey = props.match.params.appspace;
      baseAuthUrl = `${baseAuthUrl}/${props.match.params.appspace}`;
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
                type: sessionResponse.data.type,
                userId: sessionResponse.data.userId,
              })
            );
            if (type === 'oa') {
              dispatch(fetchSpace(sessionResponse.data));
              dispatch(fetchUsers(sessionResponse.data));
              dispatch(fetchRoles(sessionResponse.data));
              dispatch(fetchApp(sessionResponse.data));
              dispatch(fetchPermittedSpace(sessionResponse.data));
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
            redirectHandler(type);
          } else if (redirect && error.response.status === 401) {
            sendMessage('notification', true, {
              type: 'failure',
              message: 'Session expired',
              duration: 3000,
            });
            redirectHandler(type);
          }
        });
    } else if (redirect) {
      // dispatch(setProfile({ ...profile, appStatus: 'authenticated' }));
      redirectHandler(type);
    } else {
      return true;
    }
  };

  const redirectHandler = type => {
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

  const redirectToSpaceLogin = spaceId => {
    // window.location.href = `http://localhost:3010/#/space/${spaceId}/login`;
    props.history.push(`/space/${spaceId}/login`);
  };

  const redirectToAppspaceLogin = appspaceId => {
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
