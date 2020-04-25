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
          <NavLink to="/home" className="navitem" activeClassName="active">
            Home
          </NavLink>
          <NavLink
            to="/managespace"
            className="navitem"
            activeClassName="active"
          >
            Manage Space
          </NavLink>
          <NavLink to="/manageapp" className="navitem" activeClassName="active">
            Manage App
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Links;
