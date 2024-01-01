import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import { getProfile, setProfile } from '../../store/actions/ProfileActions';
import './Header.scss';

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
