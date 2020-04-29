import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import AuthInit from './AuthInit';

interface Props {
  authorization: Authorization;
  getAuth: Function;
  path: string;
  render: any;
  profile: any;
  setProfile: Function;
  getProfile: Function;
  component: any;
  match: any;
  history: any;
  middleware: string[];
}

const OakRoute = (props: Props) => {
  useEffect(() => {
    console.log(props.profile.appStatus, props.profile.loginPage);
    if (props.profile.appStatus === 'notmounted' && !props.profile.loginPage) {
      props.setProfile({
        tenant: props.match.params.tenant,
        appStatus: 'mounted',
      });
    } else {
      props.setProfile({ tenant: props.match.params.tenant });
    }
    middlewares(props.middleware);
  }, []);

  useEffect(() => {
    middlewares(props.middleware);
  }, [props.profile.appStatus]);

  const middlewares = layers => {
    if (props.profile.appStatus === 'authenticated') {
      layers?.forEach(middlewareName => {
        runMidleware(middlewareName);
      });
    }
  };

  const runMidleware = middlewareName => {
    switch (middlewareName) {
      case 'isAuthenticated':
        return isAuthenticated();
      case 'isAdmin':
        return isAdmin();
      default:
        return true;
    }
  };

  const isAuthenticated = () => {
    if (props.authorization.isAuth) {
      return true;
    }
    redirectToLogin();
    return false;
  };

  const isAdmin = () => {
    redirectToUnauthorized();
    return false;
  };

  const redirectToLogin = () => {
    window.location.href = `http://localhost:3010/#/login`;
  };

  const redirectToUnauthorized = () => {
    props.history.push(`/${props.profile.tenant}/unauthorized`);
  };

  return (
    <>
      <AuthInit
        profile={props.profile}
        redirectIfNotAuthenticated={
          props.middleware && props.middleware.indexOf('isAuthenticated') !== -1
        }
      />
      {(!props.middleware ||
        props.middleware.indexOf('isAuthenticated') === -1 ||
        (props.profile.appStatus === 'authenticated' &&
          props.authorization.isAuth)) && (
        <props.component
          {...props}
          profile={props.profile}
          getProfile={props.getProfile}
          setProfile={props.setProfile}
        />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth })(OakRoute);
