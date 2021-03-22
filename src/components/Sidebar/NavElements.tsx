import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';

import './NavElements.scss';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

interface Props {
  space: string;
  closeAfterRouteChange?: boolean;
}

const NavElements = (props: Props) => {
  const authorization = useSelector((state) => state.authorization);

  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="nav-elements">
      <NavItem
        to="/home"
        label="Home"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
      <NavGroup
        space={props.space}
        closeAfterRouteChange={props.closeAfterRouteChange}
        label="App"
        context="app-group"
      >
        <NavItem
          to="/app/manage"
          label="Manage App"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
      </NavGroup>
      <NavGroup
        space={props.space}
        closeAfterRouteChange={props.closeAfterRouteChange}
        label="Space"
        context="space-group"
      >
        <NavItem
          to="/space/manage"
          label="Manage Space"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
      </NavGroup>
    </div>
  );
};

export default NavElements;
