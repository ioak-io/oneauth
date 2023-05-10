import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { withRouter } from 'react-router';
import { withCookies } from 'react-cookie';
import { MenuOpen } from '@material-ui/icons';
import { getProfile, setProfile } from '../../store/actions/ProfileActions';
import packetWhite from '../../images/oneauth_white.svg';
import packetBlack from '../../images/oneauth_black.svg';

import { Profile } from '../Types/GeneralTypes';
import { receiveMessage, sendMessage } from '../../events/MessageService';
import './Header.scss';
import Logo from '../Logo';

const Header = () => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(setProfile({ ...profile, sidebar: !profile.sidebar }));
  };

  return <div className="header">{/* <Logo /> */}</div>;
};

export default Header;
