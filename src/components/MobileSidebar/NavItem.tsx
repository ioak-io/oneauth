import React, { useEffect, useRef, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProfile, setProfile } from '../../store/actions/ProfileActions';

import './NavItem.scss';

interface Props {
  to: string;
  label: string;
  closeAfterRouteChange?: boolean;
  //   history: any;
  //   cookies: any;
  //   location: any;
  //   match: any;
}

const NavItem = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  const routeChanged = () => {
    window.scrollTo(0, 0);
    if (props.closeAfterRouteChange) {
      dispatch(setProfile({ ...profile, sidebar: false }));
    }
  };

  return (
    <div className="nav-item">
      <NavLink
        to={props.to}
        className="navitem"
        onClick={routeChanged}
      >
        {props.label}
      </NavLink>
    </div>
  );
};

export default NavItem;
