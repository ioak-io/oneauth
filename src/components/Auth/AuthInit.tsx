import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withCookies, ReactCookieProps } from 'react-cookie';
import { getAuth, addAuth, removeAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';

interface Props extends ReactCookieProps {
  authorization: Authorization;
  addAuth: Function;
  getAuth: Function;
  removeAuth: Function;
  cookies: any;
}

const AuthInit = (props: Props) => {
  useEffect(() => {
    if (!props.authorization.isAuth && props.cookies.get('isAuth')) {
      props.addAuth({
        isAuth: true,
        token: props.cookies.get('token'),
        secret: props.cookies.get('secret'),
        name: props.cookies.get('name'),
      });
    }
    props.getAuth();
  }, [props.authorization.isAuth]);

  return <></>;
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth, addAuth, removeAuth })(
  withCookies(AuthInit)
);
