import React, { useEffect, useState } from 'react';
import './NavMenuIcon.scss';

interface Props {
  showClose: boolean;
  handleClick: any;
}

const NavMenuIcon = (props: Props) => {
  return (
    <div
      className={`nav-menu-icon ${props.showClose ? 'close' : ''}`}
      onClick={props.handleClick}
    >
      <span className="__line __line-left" />
      <span className="__line" />
      <span className="__line __line-right" />
    </div>
  );
};

export default NavMenuIcon;
