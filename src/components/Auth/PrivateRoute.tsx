import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAuth } from '../../actions/AuthActions';
import { Authorization } from '../Types/GeneralTypes';

interface Props {
  authorization: Authorization;
  getAuth: Function;
  path: string;
  render: any;
}

const PrivateRoute = (props: Props) => {
  useEffect(() => {
    props.getAuth();
  }, [props.authorization.isAuth]);

  return (
    <>
      {props.authorization.isAuth && (
        <Route path={props.path} render={props.render} />
      )}
      {/* {!this.props.authorization.isAuth && <Redirect to={{pathname: "/login"}} />} */}
    </>
  );
};

const mapStateToProps = state => ({
  authorization: state.authorization,
});

export default connect(mapStateToProps, { getAuth })(PrivateRoute);
