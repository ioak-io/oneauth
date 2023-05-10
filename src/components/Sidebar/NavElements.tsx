import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { getProfile, setProfile } from '../../store/actions/ProfileActions';

import './NavElements.scss';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

interface Props {
  space: string;
  closeAfterRouteChange?: boolean;
}

const NavElements = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const dispatch = useDispatch();

  return (
    <div className="nav-elements">
      <NavItem
        to={`/${props.space}/home`}
        label="Home"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
      <NavItem
        to="/palette"
        label="Generate Palette"
        closeAfterRouteChange={props.closeAfterRouteChange}
      />
      <NavGroup
        space={props.space}
        closeAfterRouteChange={props.closeAfterRouteChange}
        label="Inputs"
        context="inputs-group"
      >
        <NavItem
          to={`/${props.space}/play-input`}
          label="Input"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-select`}
          label="Select"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-checkbox`}
          label="Checkbox"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-radio`}
          label="Radio"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-button`}
          label="Button"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-click-area`}
          label="Click area"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-menu`}
          label="Menu"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
      </NavGroup>
      <NavGroup
        space={props.space}
        closeAfterRouteChange={props.closeAfterRouteChange}
        label="Data Display"
        context="data-display-group"
      >
        <NavItem
          to={`/${props.space}/play-typography`}
          label="Typography"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-divider`}
          label="Divider"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-spacing`}
          label="Spacing"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-infinite-scroll`}
          label="Infinite scroll"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-table`}
          label="Table"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
      </NavGroup>
      <NavGroup
        space={props.space}
        closeAfterRouteChange={props.closeAfterRouteChange}
        label="Surfaces"
        context="surfaces-group"
      >
        <NavItem
          to={`/${props.space}/play-section`}
          label="Section"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-expanse`}
          label="Expanse"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-sheet`}
          label="Sheet"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-modal`}
          label="Modal"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
      </NavGroup>
      <NavGroup
        space={props.space}
        closeAfterRouteChange={props.closeAfterRouteChange}
        label="Navigation"
        context="navigation-group"
      >
        <NavItem
          to={`/${props.space}/play-toolbar`}
          label="Toolbar"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-drawer`}
          label="App Drawer"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-tab`}
          label="Tab"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-nav-group`}
          label="Nav group"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-nav-element`}
          label="Nav element"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
      </NavGroup>
      <NavGroup
        space={props.space}
        closeAfterRouteChange={props.closeAfterRouteChange}
        label="Non web components"
        context="sidebar-group"
      >
        <NavItem
          to={`/${props.space}/play-chart`}
          label="Chart"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
        <NavItem
          to={`/${props.space}/play-spinner`}
          label="Spinner"
          closeAfterRouteChange={props.closeAfterRouteChange}
        />
      </NavGroup>
    </div>
  );
};

export default NavElements;
