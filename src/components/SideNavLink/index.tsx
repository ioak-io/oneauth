import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './style.scss';

interface Props {
  children: any;
  link: string;
  active?: boolean;
}

const SideNavLink = (props: Props) => {
  return (
    <div className="side-nav-link">
      <a
        className={`side-nav-link__action ${
          props.active ? 'side-nav-link__action--active' : ''
        }`}
        href={props.link}
      >
        <div className="side-nav-link__action__left">{props.children}</div>
        <div>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </a>
    </div>
  );
};

export default SideNavLink;
