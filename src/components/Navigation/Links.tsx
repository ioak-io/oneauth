import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Links.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  space: string;
}

const Links = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);

  return (
    <div className={`links ${profile.theme}`}>
      <NavLink
        to={`/${props.space}/home`}
        className="navitem"
      >
        Home
      </NavLink>
      <NavLink
        to={`/${props.space}/project`}
        className="navitem"
      >
        Projects
      </NavLink>
      <NavLink
        to={`/${props.space}/email-server`}
        className="navitem"
      >
        Email Servers
      </NavLink>
      <NavLink
        to={`/${props.space}/template`}
        className="navitem"
      >
        Templates
      </NavLink>
    </div>
  );
};

export default Links;
