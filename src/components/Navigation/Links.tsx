import React from 'react';

import './style.scss';
import { NavLink } from 'react-router-dom';
import { Authorization, Profile } from '../Types/GeneralTypes';

interface Props {
  authorization: Authorization;
  profile: Profile;
}

const Links = (props: Props) => {
  return (
    <div className="links">
      {props.authorization.isAuth && (
        <>
          <NavLink
            to={`/${props.profile.tenant}/home`}
            className="navitem"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            to={`/${props.profile.tenant}/article`}
            className="navitem"
            activeClassName="active"
          >
            Articles
          </NavLink>
          <NavLink
            to={`/${props.profile.tenant}/request`}
            className="navitem"
            activeClassName="active"
          >
            Requests
          </NavLink>
          <NavLink
            to={`/${props.profile.tenant}/useradministration`}
            className="navitem"
            activeClassName="active"
          >
            Manage User
          </NavLink>
          <NavLink
            to={`/${props.profile.tenant}/settings`}
            className="navitem"
            activeClassName="active"
          >
            Settings
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Links;
