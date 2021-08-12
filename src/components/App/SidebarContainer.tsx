import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../Sidebar';

import './SidebarContainer.scss';

const SidebarContainer = () => {
  const profile = useSelector((state: any) => state.profile);

  return (
    <div className={`sidebar-container ${profile.sidebar ? 'show' : 'hide'}`}>
      <div className={`${profile.hideSidebarOnDesktop ? 'mobile-only' : ''}`}>
        <Sidebar />
      </div>
    </div>
  );
};

export default SidebarContainer;
