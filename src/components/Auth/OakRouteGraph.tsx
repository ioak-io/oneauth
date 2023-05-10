import React from 'react';
import { useApolloClient } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { addAuth } from '../../store/actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { sendMessage } from '../../events/MessageService';
import { authorizeUserQuery, GET_SESSION } from '../Types/schema';

interface Props {
  path?: string;
  render?: any;
  component: any;
  match: any;
  history: any;
  middleware?: string[];
  cookies: any;
}

const OakRouteGraph = (props: Props) => {
  const gqlClient = useApolloClient();
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
    // sendMessage('spaceChange', true, '');
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

  const authenticate = async (type: string, redirect = true) => {
    sendMessage('spaceChange', true, props.match.params.space);
    if (authorization.isAuth) {
      return true;
    }
    const accessToken = getSessionValue(`oneauth-access_token`);
    const refreshToken = getSessionValue(`oneauth-refresh_token`);
    if (accessToken && refreshToken) {
      const { data } = await gqlClient.query({
        query: authorizeUserQuery,
        variables: {
          accessToken,
          refreshToken,
          space: props.match.params.space,
        },
      });

      if (data?.authorizeUser) {
        let newAccessToken = accessToken;
        if (data.authorizeUser.accessToken) {
          newAccessToken = data.authorizeUser.accessToken;
          setSessionValue(`oneauth-access_token`, newAccessToken);
        }
        dispatch(
          addAuth({
            ...data.authorizeUser.claims,
            accessToken: newAccessToken,
            isAuth: true,
          })
        );
      } else {
        removeSessionValue(`oneauth-access_token`);
        removeSessionValue(`oneauth-refresh_token`);

        if (redirect) {
          sendMessage('notification', true, {
            type: 'failure',
            message: 'Invalid session token',
            duration: 3000,
          });
          redirectToLogin(props.match.params.space);
        }
      }
    } else if (redirect) {
      redirectToLogin(props.match.params.space);
    } else {
      return true;
    }
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToLogin = (space: string) => {
    // window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/space/${spaceId}/login?type=signin&appId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
    navigate(
      `/${space}/login/home?from=${props.history.location.pathname}${props.history.location.search}`
    );
  };

  const redirectToUnauthorized = () => {
    navigate(`/${profile.space}/unauthorized`);
  };

  return (
    <>
      {middlewares() && (
        <props.component
          {...props}
          profile={profile}
          space={props.match.params.space}
          // getProfile={getProfile}
          // setProfile={props.setProfile}
        />
      )}
    </>
  );
};

export default OakRouteGraph;
