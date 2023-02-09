import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Links.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  realm: string;
}

const Links = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);

  return (
    <div className={`links ${profile.theme}`}>
      <NavLink
        to={`/${props.realm}/home`}
        className="navitem"
        activeClassName="active"
      >
        Home
      </NavLink>
      <NavLink
        to={`/${props.realm}/project`}
        className="navitem"
        activeClassName="active"
      >
        Projects
      </NavLink>
      <NavLink
        to={`/${props.realm}/email-server`}
        className="navitem"
        activeClassName="active"
      >
        Email Servers
      </NavLink>
      <NavLink
        to={`/${props.realm}/template`}
        className="navitem"
        activeClassName="active"
      >
        Templates
      </NavLink>
    </div>
  );
};

export default Links;
