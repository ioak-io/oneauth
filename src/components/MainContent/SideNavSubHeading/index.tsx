import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createPopper } from '@popperjs/core';
import { usePopper } from 'react-popper';
import './style.scss';
import { newId } from '../../../events/MessageService';

interface Props {
  long: any;
  short: string;
}

const SideNavSubHeading = (props: Props) => {
  const profile = useSelector((state: any) => state.profile);

  return (
    <div
      className={`side-nav-sub-heading ${
        profile.sidebar
          ? 'side-nav-sub-heading__sidebar-active'
          : 'side-nav-sub-heading__sidebar-inactive'
      }`}
    >
      {profile.sidebar ? props.long : props.short}
    </div>
  );
};

export default SideNavSubHeading;
