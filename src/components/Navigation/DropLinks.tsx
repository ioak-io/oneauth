import React from 'react';

import './DropLinks.scss';
import { NavLink } from 'react-router-dom';

interface Props {
  realm: string;
  handleClose: any;
}

const DropLinks = (props: Props) => {
  return (
    <div className="drop-links">
      <NavLink
        to={`/${props.realm}/home`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Home
      </NavLink>
      <NavLink
        to={`/${props.realm}/project`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Projects
      </NavLink>
      <NavLink
        to={`/${props.realm}/template`}
        className="navitem"
        activeClassName="active"
        onClick={props.handleClose}
      >
        Templates
      </NavLink>
    </div>
  );
};

export default DropLinks;
