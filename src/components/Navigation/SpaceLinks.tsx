import React from 'react';

import './style.scss';
import { NavLink } from 'react-router-dom';
import { Authorization, Profile } from '../Types/GeneralTypes';

interface Props {
  authorization: Authorization;
  profile: Profile;
  space: string;
}

const SpaceLinks = (props: Props) => {
  return (
    <div className="links">
      {props.authorization.isAuth && (
        <>
          <NavLink
            to={`/space/${props.space}/home`}
            className="navitem"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            to={`/space/${props.space}/test`}
            className="navitem"
            activeClassName="active"
          >
            Test Page
          </NavLink>
        </>
      )}
    </div>
  );
};

export default SpaceLinks;
