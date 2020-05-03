import { compose } from 'redux';
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withCookies, ReactCookieProps } from 'react-cookie';
import { withRouter } from 'react-router';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';
import { httpGet } from '../Lib/RestTemplate';
import { setProfile } from '../../actions/ProfileActions';
import { fetchSpace } from '../../actions/SpaceActions';
import fetchUsers from '../../actions/OaUserAction';
import { fetchRoles } from '../../actions/OaRoleActions';
import { fetchApp } from '../../actions/AppActions';
import { fetchAppSpace } from '../../actions/AppSpaceAction';

interface Props extends ReactCookieProps {
  authorization: Authorization;
  profile: any;
  addAuth: Function;
  getAuth: Function;
  removeAuth: Function;
  cookies: any;
  history: any;
  redirectIfNotAuthenticated: boolean;
}

const AuthInit = (props: Props) => {
  const profile = useSelector(state => state.profile);
  // const space = useSelector(state => state.space);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!props.authorization.isAuth && props.cookies.get('isAuth')) {
  //     props.addAuth({
  //       isAuth: true,
  //       token: props.cookies.get('token'),
  //       secret: props.cookies.get('secret'),
  //       name: props.cookies.get('name'),
  //     });
  //   }
  //   props.getAuth();
  // }, [props.authorization.isAuth]);

  useEffect(() => {
    if (profile.appStatus === 'mounted') {
      const authKey = props.cookies.get('oneauth');
      if (authKey) {
        httpGet(`/auth/session/${authKey}`, null).then(sessionResponse => {
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
            dispatch(fetchSpace(sessionResponse.data));
            dispatch(fetchUsers(sessionResponse.data));
            dispatch(fetchRoles(sessionResponse.data));
            dispatch(fetchApp(sessionResponse.data));
            dispatch(fetchAppSpace(sessionResponse.data));
            dispatch(setProfile({ ...profile, appStatus: 'authenticated' }));
          }
        });
      }
      // else if (props.redirectIfNotAuthenticated) {
      //   window.location.href = `http://localhost:3010/#/${props.profile.tenant}/login?appId=${process.env.REACT_APP_ONEAUTH_APP_ID}`;
      // }
      else {
        dispatch(setProfile({ ...profile, appStatus: 'authenticated' }));
      }
    }
  }, [profile.appStatus]);

  return <></>;
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  compose(withCookies, withRouter)(AuthInit)
);
