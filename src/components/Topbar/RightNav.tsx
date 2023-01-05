import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { useNavigate, withRouter } from 'react-router';

import './RightNav.scss';

import { receiveMessage, sendMessage } from '../../events/MessageService';
import DarkModeIcon from '../Navigation/DarkModeIcon';
import NavAccountIcon from '../Navigation/NavAccountIcon';
import { removeAuth } from '../../store/actions/AuthActions';
import OakButton from '../../oakui/wc/OakButton';

interface Props {
  cookies: any;
  //   location: any;
  //   match: any;
}

const RightNav = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const history = useNavigate();

  const logout = (
    event: any,
    type = 'success',
    message = 'You have been logged out'
  ) => {
    dispatch(removeAuth());
    // props.cookies.remove(
    //   `oneauth_${process.env.REACT_APP_ONEAUTH_CLIENTREALM_ID}`
    // );
    props.cookies.remove('oneauth');
    history(`/`);
    sendMessage('notification', true, {
      type,
      message,
      duration: 3000,
    });
  };

  const login = (type = 'signin') => {
    history(`/login?type=${type}`);
    // window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/clientrealm/${process.env.REACT_APP_ONEAUTH_CLIENTREALM_ID}/login?type=signin&clientId=${process.env.REACT_APP_ONEAUTH_CLIENT_ID}`;
  };

  return (
    <div className="right-nav">
      {/* <OakButton theme="primary" variant="appear" action={() => {}} icon="add">Income</OakButton>
      <OakButton theme="primary" variant="appear" action={() => {}} icon="add">Bill</OakButton> */}
      <DarkModeIcon />
      <NavAccountIcon cookies={props.cookies} />
    </div>
  );
};

export default RightNav;